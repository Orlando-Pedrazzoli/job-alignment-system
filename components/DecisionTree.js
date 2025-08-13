import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function DecisionTreeComponent({
  jobId,
  onNewSearch,
  onDecisionComplete,
}) {
  const [currentStep, setCurrentStep] = useState('decision-tree');
  const [decisionPath, setDecisionPath] = useState([]);

  const steps = {
    // ===== MAIN DECISION =====
    'decision-tree': {
      question: 'What action needs to be taken?',
      options: [
        { id: 'no-action', label: 'No Action', value: '1' },
        { id: 'escalate', label: 'Escalate', value: '2' },
        { id: 'label', label: 'Label', value: '3' },
      ],
    },

    // ===== NO ACTION BRANCH =====
    'no-action': {
      question: 'Is anything else going on?',
      options: [
        {
          id: 'final',
          label: 'No - No Action, Benign',
          value: 'Final: No Action, Benign',
        },
        {
          id: 'no-action-implicit',
          label: 'No Action, Implicit Sexualization of Children',
          value: '2',
        },
        {
          id: 'final',
          label: 'No - DOI Social & Political Discourse Context VII.-XII.',
          value: 'Final: DOI Social & Political Discourse',
        },
        {
          id: 'final',
          label: 'No - No Action, Missing Self-Reporting (F/N match)',
          value: 'Final: Missing Self-Reporting',
        },
        {
          id: 'final',
          label: 'Yes - Tool Rendering Issue',
          value: 'Final: Tool Rendering Issue',
        },
      ],
    },
    'no-action-implicit': {
      question: 'Which signals are present?',
      options: [
        {
          id: 'final',
          label: 'Visual signals',
          value: 'Final: No Action - Implicit Sexualization - Visual signals',
        },
        { id: 'no-action-text', label: 'Text signals', value: 'text' },
        {
          id: 'final',
          label: 'Both visual & text signals',
          value: 'Final: No Action - Implicit Sexualization - Both signals',
        },
      ],
    },
    'no-action-text': {
      question: 'Which text signals are present?',
      options: [
        {
          id: 'final',
          label: 'GIFs',
          value: 'Final: No Action - Implicit Sexualization - Text - GIFs',
        },
        {
          id: 'final',
          label: 'Other',
          value: 'Final: No Action - Implicit Sexualization - Text - Other',
        },
      ],
    },

    // ===== ESCALATE BRANCH =====
    escalate: {
      question: 'What should the content be escalated for?',
      options: [
        { id: 'escalate-child', label: 'Child Exploitation', value: '1' },
        { id: 'escalate-trafficking', label: 'Human Trafficking', value: '2' },
        { id: 'escalate-smuggling', label: 'Human Smuggling', value: '3' },
        { id: 'escalate-threatening', label: 'Threatening', value: '4' },
        { id: 'escalate-suicide', label: 'Suicide', value: '5' },
      ],
    },
    'escalate-child': {
      question: 'What do you want the content to be escalated for?',
      options: [
        {
          id: 'escalate-child-iic',
          label: 'Inappropriate Interactions with Children (IIC)',
          value: 'IIC',
        },
      ],
    },
    'escalate-child-iic': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Engaging in sexually explicit language with children',
          value:
            'Final: Escalate - Child Exploitation - IIC - Sexually explicit language',
        },
        {
          id: 'final',
          label: 'Displaying sexual material to children',
          value:
            'Final: Escalate - Child Exploitation - IIC - Displaying sexual material',
        },
        {
          id: 'final',
          label: 'Soliciting, arranging, or planning sexual encounters',
          value:
            'Final: Escalate - Child Exploitation - IIC - Soliciting encounters',
        },
      ],
    },
    'escalate-trafficking': {
      question: 'What do you want the content to be escalated for?',
      options: [
        {
          id: 'escalate-trafficking-threat',
          label: 'Imminent Threat to Life or Safety IRT',
          value: 'threat',
        },
      ],
    },
    'escalate-trafficking-threat': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Minor Sex Trafficking',
          value: 'Final: Escalate - Human Trafficking - Minor Sex Trafficking',
        },
        {
          id: 'final',
          label: 'Sex Trafficking',
          value: 'Final: Escalate - Human Trafficking - Sex Trafficking',
        },
        {
          id: 'final',
          label: 'Coordinated Commercial Sexual Activity',
          value:
            'Final: Escalate - Human Trafficking - Commercial Sexual Activity',
        },
        {
          id: 'final',
          label: 'Labor Exploitation',
          value: 'Final: Escalate - Human Trafficking - Labor Exploitation',
        },
        {
          id: 'final',
          label: 'Domestic Servitude',
          value: 'Final: Escalate - Human Trafficking - Domestic Servitude',
        },
        {
          id: 'final',
          label: 'Organ Trafficking',
          value: 'Final: Escalate - Human Trafficking - Organ Trafficking',
        },
        {
          id: 'final',
          label: 'Child Selling and Illegal Adoption',
          value: 'Final: Escalate - Human Trafficking - Child Selling',
        },
        {
          id: 'final',
          label: 'Child Soldiers',
          value: 'Final: Escalate - Human Trafficking - Child Soldiers',
        },
        {
          id: 'final',
          label: 'Other',
          value: 'Final: Escalate - Human Trafficking - Other',
        },
      ],
    },
    'escalate-smuggling': {
      question: 'What do you want the content to be escalated for?',
      options: [
        {
          id: 'escalate-smuggling-threat',
          label: 'Imminent Threat to Life or Safety IRT',
          value: 'threat',
        },
      ],
    },
    'escalate-smuggling-threat': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Facilitate/Offer to provide services',
          value: 'Final: Escalate - Human Smuggling - Facilitate services',
        },
        {
          id: 'final',
          label: 'Asks for services',
          value: 'Final: Escalate - Human Smuggling - Asks for services',
        },
      ],
    },
    'escalate-threatening': {
      question: 'What Exactly?',
      options: [
        {
          id: 'escalate-threatening-dangerous',
          label: 'Threatening - Dangerous Individuals and Orgs',
          value: 'dangerous',
        },
      ],
    },
    'escalate-threatening-dangerous': {
      question: 'What do you want the content to be escalated for?',
      options: [
        {
          id: 'final',
          label: 'Terrorism',
          value: 'Final: Escalate - Threatening - Dangerous - Terrorism',
        },
        {
          id: 'final',
          label: 'Hate Orgs',
          value: 'Final: Escalate - Threatening - Dangerous - Hate Orgs',
        },
        {
          id: 'final',
          label: 'Criminal Orgs',
          value: 'Final: Escalate - Threatening - Dangerous - Criminal Orgs',
        },
        {
          id: 'final',
          label: 'Violent Non-State Actors',
          value:
            'Final: Escalate - Threatening - Dangerous - Violent Non-State Actors',
        },
      ],
    },
    'escalate-suicide': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Graphic/Promotion',
          value: 'Final: Escalate - Suicide - Graphic/Promotion',
        },
        {
          id: 'final',
          label: 'Admission',
          value: 'Final: Escalate - Suicide - Admission',
        },
      ],
    },

    // ===== LABEL BRANCH =====
    label: {
      question: 'What Abuse Type?',
      options: [
        {
          id: 'label-suicide',
          label: 'Suicide, Self-Injury & Eating Disorders',
          value: '1',
        },
        {
          id: 'label-child-exploitation',
          label: 'Child Exploitation',
          value: '2',
        },
        {
          id: 'label-human-exploitation',
          label: 'Human Exploitation',
          value: '3',
        },
        {
          id: 'label-drugs',
          label: 'RGS - Drugs and Pharmaceuticals',
          value: '4',
        },
        {
          id: 'label-dangerous-orgs',
          label: 'Dangerous Orgs and Individuals',
          value: '5',
        },
        {
          id: 'label-adult-sexual',
          label: 'Adult Sexual Exploitation',
          value: '6',
        },
        {
          id: 'label-prostitution',
          label:
            'Prostitution / Adult Sexual Solicitation and Sexually Explicit Language',
          value: '7',
        },
        { id: 'label-child-nudity', label: 'Child Nudity', value: '8' },
        {
          id: 'label-violent-graphic',
          label: 'Violent and Graphic Content',
          value: '9',
        },
        {
          id: 'label-adult-nudity',
          label: 'Adult Nudity and Sexual Activity',
          value: '0',
        },
        {
          id: 'label-weapons',
          label: 'RGS - Weapons, Ammunition, Explosives',
          value: 'A',
        },
        {
          id: 'label-violence-incitement',
          label: 'Violence and Incitement',
          value: 'B',
        },
        { id: 'label-hateful', label: 'Hateful Conduct', value: 'C' },
        { id: 'label-bullying', label: 'Bullying and Harassment', value: 'D' },
        {
          id: 'label-coordinating-harm',
          label: 'Coordinating Harm and Promoting Crime',
          value: 'E',
        },
        {
          id: 'label-fraud',
          label: 'Fraud, Scams, and Deceptive Practices',
          value: 'F',
        },
        { id: 'label-tobacco', label: 'RGS - Tobacco and Alcohol', value: 'G' },
        { id: 'label-health', label: 'RGS - Health and Wellness', value: 'H' },
        { id: 'label-gambling', label: 'RGS - Gambling and Games', value: 'I' },
        { id: 'label-rgs-other', label: 'RGS Other', value: 'J' },
        { id: 'label-recalled', label: 'RGS - Recalled Products', value: 'K' },
        { id: 'label-privacy', label: 'Privacy Violation', value: 'L' },
        { id: 'label-cybersecurity', label: 'Cybersecurity', value: 'M' },
        { id: 'label-spam', label: 'Spam', value: 'N' },
      ],
    },

    // ===== LABEL - SUICIDE, SELF-INJURY & EATING DISORDERS =====
    'label-suicide': {
      question: 'Which Sub-Harm of SSIED?',
      options: [
        { id: 'suicide-suicide', label: 'Suicide', value: 'suicide' },
        {
          id: 'suicide-self-injury',
          label: 'Self-Injury',
          value: 'self-injury',
        },
        { id: 'suicide-eating', label: 'Eating Disorder', value: 'eating' },
      ],
    },
    'suicide-suicide': {
      question: 'What Suicide abuse type is present?',
      options: [
        { id: 'suicide-promotion', label: 'Promotion', value: '1' },
        { id: 'suicide-graphic', label: 'Graphic Content', value: '2' },
        { id: 'suicide-mocking', label: 'Mocking', value: '3' },
        { id: 'suicide-admission', label: 'Admission', value: '4' },
        {
          id: 'final',
          label: 'Suicide Reference or Narratives',
          value: 'Final: Label - Suicide - Reference or Narratives',
        },
      ],
    },
    'suicide-promotion': {
      question: 'What Suicide abuse type is present?',
      options: [
        {
          id: 'final',
          label: 'Encourages, coordinates, or provides instructions',
          value: 'Final: Label - Suicide - Promotion - Instructions',
        },
        {
          id: 'final',
          label: 'Speaks positively',
          value: 'Final: Label - Suicide - Promotion - Speaks positively',
        },
      ],
    },
    'suicide-graphic': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Imagery depicting a suicide attempt or death by suicide',
          value: 'Final: Label - Suicide - Graphic - Suicide imagery',
        },
        {
          id: 'final',
          label: 'Sensational (Media)',
          value: 'Final: Label - Suicide - Graphic - Sensational Media',
        },
        {
          id: 'final',
          label: 'Graphic Admission',
          value: 'Final: Label - Suicide - Graphic - Graphic Admission',
        },
        {
          id: 'final',
          label: 'Assisted Suicide or Euthanasia in medical setting',
          value: 'Final: Label - Suicide - Graphic - Assisted Suicide',
        },
      ],
    },
    'suicide-mocking': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Promotes Satirically or Humorously',
          value: 'Final: Label - Suicide - Mocking - Satirically',
        },
        {
          id: 'final',
          label: 'Mocking or dismissing the concept of suicide',
          value: 'Final: Label - Suicide - Mocking - Dismissing concept',
        },
      ],
    },
    'suicide-admission': {
      question: 'What Exactly?',
      options: [
        {
          id: 'suicide-admission-detail',
          label:
            'Admission OR Vague statement engagement in suicide or attempted suicide (no graphic imagery)',
          value: 'admission',
        },
      ],
    },
    'suicide-admission-detail': {
      question: 'Why is this content not being escalated?',
      options: [
        {
          id: 'final',
          label:
            "Does not meet qualitative criteria for 'credible suicide threat'",
          value: 'Final: Label - Suicide - Admission - Not credible threat',
        },
        {
          id: 'final',
          label: 'Does not meet time criteria - more than 1 day in the future',
          value: 'Final: Label - Suicide - Admission - Future timeframe',
        },
        {
          id: 'final',
          label: 'Does not meet time criteria - more than 24 hours old',
          value: 'Final: Label - Suicide - Admission - Past timeframe',
        },
      ],
    },
    'suicide-self-injury': {
      question: 'What Exactly?',
      options: [
        { id: 'self-injury-promotion', label: 'Promotion', value: '1' },
        { id: 'self-injury-graphic', label: 'Graphic Content', value: '2' },
        { id: 'self-injury-mocking', label: 'Mocking', value: '3' },
        { id: 'self-injury-admission', label: 'Admission', value: '4' },
        {
          id: 'final',
          label: 'Self-Injury Reference or Narratives',
          value: 'Final: Label - Self-Injury - Reference or Narratives',
        },
      ],
    },
    'self-injury-promotion': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Encouragement, coordination and providing instructions',
          value: 'Final: Label - Self-Injury - Promotion - Instructions',
        },
        {
          id: 'final',
          label: 'Speaks Positively',
          value: 'Final: Label - Self-Injury - Promotion - Speaks positively',
        },
      ],
    },
    'self-injury-graphic': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Sensational (Media)',
          value: 'Final: Label - Self-Injury - Graphic - Sensational Media',
        },
        {
          id: 'final',
          label: 'Graphic Admission',
          value: 'Final: Label - Self-Injury - Graphic - Graphic Admission',
        },
        {
          id: 'final',
          label:
            'Admission of engagement in self-injury or attempted self-injury (with healed cut present)',
          value: 'Final: Label - Self-Injury - Graphic - With healed cut',
        },
      ],
    },
    'self-injury-mocking': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Promotes satirically or humorously',
          value: 'Final: Label - Self-Injury - Mocking - Satirically',
        },
        {
          id: 'final',
          label: 'Mocking or dismissing the concept of self-injury',
          value: 'Final: Label - Self-Injury - Mocking - Dismissing concept',
        },
      ],
    },
    'self-injury-admission': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label:
            'Admissions of engagement in self-injury or attempted self-injury (no graphic imagery)',
          value: 'Final: Label - Self-Injury - Admission - No graphic imagery',
        },
        {
          id: 'final',
          label: 'Recovery with Imagery present',
          value:
            'Final: Label - Self-Injury - Admission - Recovery with imagery',
        },
      ],
    },
    'suicide-eating': {
      question: 'Is there any Eating Disorder (ED) context present?',
      options: [
        { id: 'eating-yes', label: 'Yes', value: '1' },
        { id: 'eating-no', label: 'No', value: '2' },
      ],
    },
    'eating-yes': {
      question: 'What Eating Disorder abuse type is present?',
      options: [
        {
          id: 'final',
          label: 'Promotion',
          value: 'Final: Label - Eating Disorder - Context Yes - Promotion',
        },
        {
          id: 'final',
          label: 'Graphic Content',
          value:
            'Final: Label - Eating Disorder - Context Yes - Graphic Content',
        },
        {
          id: 'final',
          label: 'Mocking',
          value: 'Final: Label - Eating Disorder - Context Yes - Mocking',
        },
        {
          id: 'final',
          label: 'Admission',
          value: 'Final: Label - Eating Disorder - Context Yes - Admission',
        },
        {
          id: 'final',
          label: 'Recovery',
          value: 'Final: Label - Eating Disorder - Context Yes - Recovery',
        },
      ],
    },
    'eating-no': {
      question: 'What content is presented?',
      options: [
        {
          id: 'final',
          label: 'Promotion',
          value: 'Final: Label - Eating Disorder - Context No - Promotion',
        },
        {
          id: 'final',
          label: 'Graphic Content',
          value:
            'Final: Label - Eating Disorder - Context No - Graphic Content',
        },
        {
          id: 'final',
          label: 'Admission',
          value: 'Final: Label - Eating Disorder - Context No - Admission',
        },
        {
          id: 'final',
          label: 'Others',
          value: 'Final: Label - Eating Disorder - Context No - Others',
        },
      ],
    },

    // ===== LABEL - CHILD EXPLOITATION =====
    'label-child-exploitation': {
      question: 'What Child Exploitation exactly?',
      options: [
        {
          id: 'child-content-solicitation',
          label: 'Content Solicitation',
          value: '1',
        },
        {
          id: 'child-explicit-sexualization',
          label: 'Explicit Sexualization of Children',
          value: '2',
        },
        {
          id: 'child-sexual-exploitation',
          label:
            'Child Sexual Exploitation (non-real minors, sexual fetish, pedophilia, other)',
          value: '3',
        },
        {
          id: 'child-non-sexual-abuse',
          label: 'Non-Sexual Child Abuse',
          value: '4',
        },
      ],
    },
    'child-content-solicitation': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label:
            'Nude or sexualized imagery of real-children (age-ambiguous reference)',
          value:
            'Final: Label - Child Exploitation - Content Solicitation - Real children',
        },
        {
          id: 'final',
          label: 'Nude or sexualized imagery of Non-real children',
          value:
            'Final: Label - Child Exploitation - Content Solicitation - Non-real children',
        },
      ],
    },
    'child-explicit-sexualization': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Sexualized Imagery of Children',
          value:
            'Final: Label - Child Exploitation - Explicit Sexualization - Imagery',
        },
        {
          id: 'final',
          label: 'Sexualized Text about children',
          value:
            'Final: Label - Child Exploitation - Explicit Sexualization - Text',
        },
      ],
    },
    'child-sexual-exploitation': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Non-real child sexual exploitation imagery',
          value:
            'Final: Label - Child Exploitation - Sexual Exploitation - Non-real imagery',
        },
        {
          id: 'final',
          label:
            'Identifying or mocking an alleged victim of child sexual exploitation',
          value:
            'Final: Label - Child Exploitation - Sexual Exploitation - Victim identification',
        },
        {
          id: 'final',
          label: 'Content supporting/promoting Pedophilia',
          value:
            'Final: Label - Child Exploitation - Sexual Exploitation - Pedophilia support',
        },
        {
          id: 'final',
          label: 'Sexual fetish',
          value:
            'Final: Label - Child Exploitation - Sexual Exploitation - Sexual fetish',
        },
        {
          id: 'final',
          label: 'Other',
          value:
            'Final: Label - Child Exploitation - Sexual Exploitation - Other',
        },
      ],
    },
    'child-non-sexual-abuse': {
      question: 'What Non-Sexual Child Abuse exactly?',
      options: [
        {
          id: 'final',
          label:
            'Videos or photos that depict police officers or military personnel committing non-sexual child abuse',
          value:
            'Final: Label - Child Exploitation - Non-Sexual Abuse - Police/military',
        },
        {
          id: 'final',
          label:
            'Videos or photos of violent immersion of a child in water in the context of religious rituals',
          value:
            'Final: Label - Child Exploitation - Non-Sexual Abuse - Religious rituals',
        },
        {
          id: 'final',
          label: 'Other',
          value: 'Final: Label - Child Exploitation - Non-Sexual Abuse - Other',
        },
      ],
    },

    // ===== LABEL - HUMAN EXPLOITATION =====
    'label-human-exploitation': {
      question: 'What exactly?',
      options: [
        { id: 'human-trafficking', label: 'Human Trafficking', value: '1' },
        { id: 'human-smuggling', label: 'Human Smuggling', value: '2' },
      ],
    },
    'human-trafficking': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Child Selling and/or Illegal Adoption',
          value:
            'Final: Label - Human Exploitation - Trafficking - Child Selling',
        },
        {
          id: 'final',
          label: 'Child soldiers',
          value:
            'Final: Label - Human Exploitation - Trafficking - Child soldiers',
        },
        {
          id: 'final',
          label: 'Labor Exploitation',
          value:
            'Final: Label - Human Exploitation - Trafficking - Labor Exploitation',
        },
        {
          id: 'final',
          label: 'Domestic Servitude',
          value:
            'Final: Label - Human Exploitation - Trafficking - Domestic Servitude',
        },
        {
          id: 'final',
          label: 'Domestic Helpers',
          value:
            'Final: Label - Human Exploitation - Trafficking - Domestic Helpers',
        },
        {
          id: 'final',
          label: 'Temporary Marriages',
          value:
            'Final: Label - Human Exploitation - Trafficking - Temporary Marriages',
        },
      ],
    },
    'human-smuggling': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Facilitate/Offer to provide services',
          value:
            'Final: Label - Human Exploitation - Smuggling - Facilitate services',
        },
        {
          id: 'final',
          label: 'Asks for services',
          value:
            'Final: Label - Human Exploitation - Smuggling - Asks for services',
        },
        {
          id: 'final',
          label: 'Personal safety and border crossing, seeking asylum',
          value:
            'Final: Label - Human Exploitation - Smuggling - Seeking asylum',
        },
      ],
    },

    // ===== LABEL - RGS DRUGS AND PHARMACEUTICALS =====
    'label-drugs': {
      question: 'What abuse type do you see?',
      options: [
        { id: 'drugs-high-risk', label: 'High-Risk Drugs', value: '1' },
        { id: 'drugs-non-medical', label: 'Non-Medical Drugs', value: '2' },
        { id: 'drugs-entheogen', label: 'Entheogen Drugs', value: '3' },
        {
          id: 'drugs-prescription',
          label: 'Prescription Drugs, Over-the-Counter Drugs',
          value: '4',
        },
        {
          id: 'drugs-cannabis',
          label: 'Cannabis and Cannabis Derived Products',
          value: '5',
        },
        { id: 'drugs-addiction', label: 'Addiction Treatment', value: '6' },
      ],
    },
    'drugs-high-risk': {
      question: 'In what context?',
      options: [
        {
          id: 'final',
          label: 'Buy/Sell/Trade',
          value: 'Final: Label - RGS Drugs - High-Risk - Buy/Sell/Trade',
        },
        {
          id: 'final',
          label: 'Admission/Consumption/Promotion',
          value: 'Final: Label - RGS Drugs - High-Risk - Admission/Consumption',
        },
      ],
    },
    'drugs-non-medical': {
      question: 'In what context?',
      options: [
        {
          id: 'final',
          label: 'Buy/Sell/Trade',
          value: 'Final: Label - RGS Drugs - Non-Medical - Buy/Sell/Trade',
        },
        {
          id: 'final',
          label: 'Admission/Consumption/Promotion',
          value:
            'Final: Label - RGS Drugs - Non-Medical - Admission/Consumption',
        },
      ],
    },
    'drugs-entheogen': {
      question: 'In what context?',
      options: [
        {
          id: 'final',
          label: 'Buy/Sell/Trade',
          value: 'Final: Label - RGS Drugs - Entheogen - Buy/Sell/Trade',
        },
        {
          id: 'final',
          label: 'Admission/Consumption/Promotion',
          value: 'Final: Label - RGS Drugs - Entheogen - Admission/Consumption',
        },
      ],
    },
    'drugs-prescription': {
      question: 'What kind of drugs?',
      options: [
        { id: 'prescription-drugs', label: 'Prescription Drugs', value: '1' },
        {
          id: 'otc-drugs',
          label: 'Over-the-Counter Drugs and Animal Medicines',
          value: '2',
        },
      ],
    },
    'prescription-drugs': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Sale',
          value: 'Final: Label - RGS Drugs - Prescription - Sale',
        },
        {
          id: 'final',
          label: 'Admission / Consumption',
          value:
            'Final: Label - RGS Drugs - Prescription - Admission/Consumption',
        },
        {
          id: 'final',
          label: 'Promotion',
          value: 'Final: Label - RGS Drugs - Prescription - Promotion',
        },
        {
          id: 'final',
          label: 'News / PSA',
          value: 'Final: Label - RGS Drugs - Prescription - News/PSA',
        },
      ],
    },
    'otc-drugs': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'OTC Sale',
          value: 'Final: Label - RGS Drugs - OTC - Sale',
        },
        {
          id: 'final',
          label: 'Animal Medications Sale',
          value: 'Final: Label - RGS Drugs - OTC - Animal Medications',
        },
      ],
    },
    'drugs-cannabis': {
      question: 'What type of Cannabis?',
      options: [
        { id: 'cannabis-thc', label: 'Marijuana / THC', value: '1' },
        { id: 'cannabis-cbd', label: 'CBD', value: '2' },
        {
          id: 'final',
          label: 'Hemp',
          value: 'Final: Label - RGS Drugs - Cannabis - Hemp',
        },
      ],
    },
    'cannabis-thc': {
      question: 'What exactly is shown?',
      options: [
        {
          id: 'final',
          label: 'Sale',
          value: 'Final: Label - RGS Drugs - Cannabis THC - Sale',
        },
        {
          id: 'final',
          label: 'Promotion / Marijuana Dispensary / Paraphernalia',
          value:
            'Final: Label - RGS Drugs - Cannabis THC - Promotion/Dispensary',
        },
        {
          id: 'final',
          label: 'Fictional or Documentary',
          value:
            'Final: Label - RGS Drugs - Cannabis THC - Fictional/Documentary',
        },
      ],
    },
    'cannabis-cbd': {
      question: 'Is it an ingestible?',
      options: [
        {
          id: 'final',
          label: 'Yes',
          value: 'Final: Label - RGS Drugs - Cannabis CBD - Ingestible Yes',
        },
        {
          id: 'final',
          label: 'No',
          value: 'Final: Label - RGS Drugs - Cannabis CBD - Ingestible No',
        },
      ],
    },
    'drugs-addiction': {
      question: 'What type of treatment?',
      options: [
        {
          id: 'final',
          label: 'Drug & Alcohol Addiction Treatment',
          value:
            'Final: Label - RGS Drugs - Addiction - Drug/Alcohol Treatment',
        },
        {
          id: 'final',
          label: 'Other Rehabilitation (Not Alcohol or Drugs)',
          value: 'Final: Label - RGS Drugs - Addiction - Other Rehabilitation',
        },
      ],
    },

    // ===== LABEL - DANGEROUS ORGS AND INDIVIDUALS =====
    'label-dangerous-orgs': {
      question: 'What exactly?',
      options: [
        { id: 'dangerous-terrorism', label: 'Terrorism', value: '1' },
        {
          id: 'dangerous-hate',
          label: 'Hate Organizations and Individuals',
          value: '2',
        },
        {
          id: 'dangerous-criminal',
          label: 'Criminal Organizations',
          value: '3',
        },
        {
          id: 'dangerous-violent-events',
          label: 'Violating Violent Events',
          value: '4',
        },
        { id: 'dangerous-vnsa', label: 'VNSA and VIE', value: '5' },
        {
          id: 'final',
          label: 'Social & Political Discourse Context I.-VI.',
          value: 'Final: Label - Dangerous Orgs - Social Political Discourse',
        },
      ],
    },
    'dangerous-terrorism': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Representation, Glorification, or Support',
          value:
            'Final: Label - Dangerous Orgs - Terrorism - Representation/Glorification',
        },
        {
          id: 'final',
          label: 'References',
          value: 'Final: Label - Dangerous Orgs - Terrorism - References',
        },
      ],
    },
    'dangerous-hate': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Representation, Glorification, or Support',
          value:
            'Final: Label - Dangerous Orgs - Hate Organizations - Representation/Glorification',
        },
        {
          id: 'final',
          label: 'References',
          value:
            'Final: Label - Dangerous Orgs - Hate Organizations - References',
        },
      ],
    },
    'dangerous-criminal': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Representation, Glorification, or Support',
          value:
            'Final: Label - Dangerous Orgs - Criminal Organizations - Representation/Glorification',
        },
        {
          id: 'final',
          label: 'References',
          value:
            'Final: Label - Dangerous Orgs - Criminal Organizations - References',
        },
      ],
    },
    'dangerous-violent-events': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Representation, Glorification, or Support',
          value:
            'Final: Label - Dangerous Orgs - Violent Events - Representation/Glorification',
        },
        {
          id: 'final',
          label: 'References',
          value: 'Final: Label - Dangerous Orgs - Violent Events - References',
        },
      ],
    },
    'dangerous-vnsa': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Representation, Glorification, or Material Support',
          value:
            'Final: Label - Dangerous Orgs - VNSA/VIE - Representation/Glorification',
        },
        {
          id: 'final',
          label: 'References or Other Support',
          value:
            'Final: Label - Dangerous Orgs - VNSA/VIE - References/Support',
        },
      ],
    },

    // ===== LABEL - ADULT SEXUAL EXPLOITATION =====
    'label-adult-sexual': {
      question: 'What Adult Exploitation exactly?',
      options: [
        { id: 'ncii-sextortion', label: 'NCII for Sextortion', value: '1' },
        { id: 'ncii-harassment', label: 'NCII for Harassment', value: '2' },
        {
          id: 'final',
          label: 'NCII Sensationalist',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Sensationalist',
        },
        {
          id: 'final',
          label: 'NCII Services',
          value: 'Final: Label - Adult Sexual Exploitation - NCII Services',
        },
        { id: 'ncst', label: 'NCST', value: '5' },
        {
          id: 'final',
          label: 'Creepshot',
          value: 'Final: Label - Adult Sexual Exploitation - Creepshot',
        },
        {
          id: 'final',
          label: 'Forced Stripping or Necrophilia',
          value:
            'Final: Label - Adult Sexual Exploitation - Forced Stripping/Necrophilia',
        },
      ],
    },
    'ncii-sextortion': {
      question: 'What is depicted?',
      options: [
        {
          id: 'final',
          label: 'Nudity OR Sexual Activity',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Sextortion - Nudity/Sexual Activity',
        },
        {
          id: 'final',
          label: 'Near Nudity/Sexually suggestive pose',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Sextortion - Near Nudity',
        },
        {
          id: 'final',
          label: 'Threats to share OR Solicitation',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Sextortion - Threats/Solicitation',
        },
      ],
    },
    'ncii-harassment': {
      question: 'What is depicted?',
      options: [
        {
          id: 'final',
          label: 'Nudity OR Sexual Activity',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Harassment - Nudity/Sexual Activity',
        },
        {
          id: 'final',
          label: 'Near Nudity/Sexually suggestive pose',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Harassment - Near Nudity',
        },
        {
          id: 'final',
          label: 'Threats to share OR Solicitation',
          value:
            'Final: Label - Adult Sexual Exploitation - NCII Harassment - Threats/Solicitation',
        },
      ],
    },
    ncst: {
      question: 'What NCST Exactly?',
      options: [
        {
          id: 'final',
          label: 'NCST Rape Threat',
          value:
            'Final: Label - Adult Sexual Exploitation - NCST - Rape Threat',
        },
        {
          id: 'final',
          label: 'NCST Imagery',
          value: 'Final: Label - Adult Sexual Exploitation - NCST - Imagery',
        },
        {
          id: 'final',
          label: 'NCST Text',
          value: 'Final: Label - Adult Sexual Exploitation - NCST - Text',
        },
        {
          id: 'final',
          label: 'Identifying Victims of Sexual Assault (VOSA)',
          value: 'Final: Label - Adult Sexual Exploitation - NCST - VOSA',
        },
        {
          id: 'final',
          label: 'NCST Awareness',
          value: 'Final: Label - Adult Sexual Exploitation - NCST - Awareness',
        },
      ],
    },

    // ===== LABEL - PROSTITUTION / ADULT SEXUAL SOLICITATION =====
    'label-prostitution': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Prostitution',
          value: 'Final: Label - Prostitution/Solicitation - Prostitution',
        },
        {
          id: 'prostitution-sexual-solicitation',
          label: 'Sexual Solicitation',
          value: '2',
        },
        {
          id: 'prostitution-pornography',
          label: 'Pornography and Adult Websites',
          value: '3',
        },
        {
          id: 'prostitution-sexualized-language',
          label: 'Sexualized Language',
          value: '4',
        },
      ],
    },
    'prostitution-sexual-solicitation': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Sexual Solicitation',
          value:
            'Final: Label - Prostitution/Solicitation - Sexual Solicitation',
        },
        {
          id: 'final',
          label: 'Discussing sexual practices/experiences',
          value:
            'Final: Label - Prostitution/Solicitation - Discussing practices',
        },
      ],
    },
    'prostitution-pornography': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Ask/Offer/Interaction information for Pornographic material',
          value:
            'Final: Label - Prostitution/Solicitation - Pornographic material',
        },
        {
          id: 'final',
          label: 'Contains usernames, links to Pornographic Websites',
          value:
            'Final: Label - Prostitution/Solicitation - Pornographic websites',
        },
        {
          id: 'final',
          label:
            'Contains usernames, links to, or logos of Adult Subscription Websites',
          value:
            'Final: Label - Prostitution/Solicitation - Adult subscription sites',
        },
      ],
    },
    'prostitution-sexualized-language': {
      question: 'What Exactly?',
      options: [
        {
          id: 'final',
          label: 'Sexually Explicit Language',
          value: 'Final: Label - Prostitution/Solicitation - Explicit language',
        },
        {
          id: 'final',
          label: 'Sexually Suggestive Language',
          value:
            'Final: Label - Prostitution/Solicitation - Suggestive language',
        },
        {
          id: 'final',
          label: 'Sexual Commentary',
          value: 'Final: Label - Prostitution/Solicitation - Sexual commentary',
        },
        {
          id: 'final',
          label: 'Content expressing desire for sexual activity',
          value:
            'Final: Label - Prostitution/Solicitation - Desire for activity',
        },
      ],
    },

    // ===== LABEL - CHILD NUDITY =====
    'label-child-nudity': {
      question: 'Select the most relevant category',
      options: [
        {
          id: 'child-nudity-sexualization',
          label: 'Child Nudity with Sexualization of Children',
          value: '1',
        },
        {
          id: 'child-nudity-minor',
          label:
            'Child Nudity of Real/Non-Real Minor (4 - less than 18 years old)',
          value: '2',
        },
        {
          id: 'child-nudity-toddler',
          label:
            'Child Nudity of Real/Non-Real Toddler (1.5 - less than 4 years old)',
          value: '3',
        },
        {
          id: 'child-nudity-baby',
          label: 'Child Nudity of Real/Non-Real Baby (0 - 1.5 years old)',
          value: '4',
        },
        {
          id: 'child-nudity-art',
          label: 'Real-world Art of Child Nudity',
          value: '5',
        },
        {
          id: 'final',
          label: 'Non-Real Imagery of Child Nudity in a Health Context',
          value: 'Final: Label - Child Nudity - Health Context',
        },
      ],
    },
    'child-nudity-sexualization': {
      question: 'What Child Exploitation exactly?',
      options: [
        {
          id: 'final',
          label: 'Content Solicitation',
          value:
            'Final: Label - Child Nudity - Sexualization - Content Solicitation',
        },
        {
          id: 'final',
          label: 'Explicit Sexualization of Children',
          value:
            'Final: Label - Child Nudity - Sexualization - Explicit Sexualization',
        },
        {
          id: 'final',
          label:
            'Child Sexual Exploitation (non-real minors, sexual fetish, pedophilia, other)',
          value:
            'Final: Label - Child Nudity - Sexualization - Sexual Exploitation',
        },
        {
          id: 'final',
          label: 'Non-Sexual Child Abuse',
          value:
            'Final: Label - Child Nudity - Sexualization - Non-Sexual Abuse',
        },
      ],
    },
    'child-nudity-minor': {
      question: 'What Child Nudity exactly?',
      options: [
        {
          id: 'final',
          label:
            'Visible genitalia (even when covered or obscured by transparent clothing)',
          value: 'Final: Label - Child Nudity - Minor - Visible genitalia',
        },
        {
          id: 'final',
          label: 'Visible anus and/or fully nude close-up of buttocks',
          value: 'Final: Label - Child Nudity - Minor - Visible anus/buttocks',
        },
        {
          id: 'final',
          label: 'Uncovered Female nipples',
          value: 'Final: Label - Child Nudity - Minor - Female nipples',
        },
        {
          id: 'final',
          label:
            'No clothes present from neck to knee (even if no genitalia/nipples are showing)',
          value:
            'Final: Label - Child Nudity - Minor - No clothes neck to knee',
        },
        {
          id: 'final',
          label:
            'Implied nudity where there is at least one piece of clothing between neck and knees',
          value: 'Final: Label - Child Nudity - Minor - Implied nudity',
        },
      ],
    },
    'child-nudity-toddler': {
      question: 'What Child Nudity exactly?',
      options: [
        {
          id: 'final',
          label:
            'Visible genitalia (even when covered or obscured by transparent clothing)',
          value: 'Final: Label - Child Nudity - Toddler - Visible genitalia',
        },
        {
          id: 'final',
          label: 'Visible anus and/or fully nude close-up of buttocks',
          value:
            'Final: Label - Child Nudity - Toddler - Visible anus/buttocks',
        },
        {
          id: 'final',
          label: 'Female nipples of toddler',
          value: 'Final: Label - Child Nudity - Toddler - Female nipples',
        },
        {
          id: 'final',
          label: 'Long-shots of fully nude buttocks',
          value:
            'Final: Label - Child Nudity - Toddler - Nude buttocks long-shots',
        },
        {
          id: 'final',
          label:
            'Implied nudity (under-clothed or no clothes between knees and neck AND no genitalia visible)',
          value: 'Final: Label - Child Nudity - Toddler - Implied nudity',
        },
      ],
    },
    'child-nudity-baby': {
      question: 'What Child Nudity exactly?',
      options: [
        {
          id: 'final',
          label: 'Close-ups of genitalia',
          value: 'Final: Label - Child Nudity - Baby - Close-ups genitalia',
        },
      ],
    },
    'child-nudity-art': {
      question: 'What is the context?',
      options: [
        {
          id: 'final',
          label:
            'Depicting any kind of sexual activity, sexual elements, or having sexual context',
          value: 'Final: Label - Child Nudity - Art - Sexual context',
        },
        {
          id: 'final',
          label: 'Health or other context',
          value: 'Final: Label - Child Nudity - Art - Health/other context',
        },
      ],
    },

    // ===== LABEL - VIOLENT AND GRAPHIC CONTENT =====
    'label-violent-graphic': {
      question: 'What is displayed?',
      options: [
        { id: 'violent-sadistic', label: 'Sadistic Remarks', value: '1' },
        { id: 'violent-mutilated', label: 'Mutilated Humans', value: '2' },
        {
          id: 'violent-brutality',
          label: 'Violence, Brutality and Capital Punishment',
          value: '3',
        },
        { id: 'violent-gore', label: 'Human Gore', value: '4' },
        {
          id: 'violent-dead-babies',
          label: 'Dead Babies and Fetus',
          value: '5',
        },
        { id: 'violent-medical', label: 'Human Medical', value: '6' },
        { id: 'violent-armament', label: 'Armament', value: '7' },
        {
          id: 'final',
          label: 'Graphic Vehicle Damage',
          value: 'Final: Label - Violent Graphic - Vehicle Damage',
        },
        { id: 'violent-animal', label: 'Animal', value: '9' },
        {
          id: 'violent-fictional',
          label: 'Recognized Fictional Graphic Imagery',
          value: '0',
        },
      ],
    },
    'violent-sadistic': {
      question: 'What is the context?',
      options: [
        {
          id: 'final',
          label: 'Medical, self-defense or DOI context',
          value:
            'Final: Label - Violent Graphic - Sadistic - Medical/self-defense/DOI',
        },
        {
          id: 'final',
          label: 'Any other context',
          value: 'Final: Label - Violent Graphic - Sadistic - Other context',
        },
      ],
    },
    'violent-mutilated': {
      question: 'What type of content?',
      options: [
        { id: 'mutilated-video', label: 'In video', value: '1' },
        { id: 'mutilated-photo', label: 'In photo', value: '2' },
      ],
    },
    'mutilated-video': {
      question: 'What specifically?',
      options: [
        {
          id: 'final',
          label: 'Dismemberment',
          value:
            'Final: Label - Violent Graphic - Mutilated Video - Dismemberment',
        },
        {
          id: 'final',
          label: 'Severely Burned or Charred',
          value:
            'Final: Label - Violent Graphic - Mutilated Video - Burned/Charred',
        },
        {
          id: 'final',
          label: 'Throat Slitting',
          value:
            'Final: Label - Violent Graphic - Mutilated Video - Throat Slitting',
        },
        {
          id: 'final',
          label: 'Visible Innards',
          value:
            'Final: Label - Violent Graphic - Mutilated Video - Visible Innards',
        },
      ],
    },
    'mutilated-photo': {
      question: 'What specifically?',
      options: [
        {
          id: 'final',
          label: 'Dismemberment',
          value:
            'Final: Label - Violent Graphic - Mutilated Photo - Dismemberment',
        },
        {
          id: 'final',
          label: 'Severely Burned or Charred',
          value:
            'Final: Label - Violent Graphic - Mutilated Photo - Burned/Charred',
        },
        {
          id: 'final',
          label: 'Throat Slitting',
          value:
            'Final: Label - Violent Graphic - Mutilated Photo - Throat Slitting',
        },
        {
          id: 'final',
          label: 'Visible Innards',
          value:
            'Final: Label - Violent Graphic - Mutilated Photo - Visible Innards',
        },
      ],
    },
    'violent-brutality': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Live-streams of Capital Punishment',
          value:
            'Final: Label - Violent Graphic - Brutality - Live-streams Capital Punishment',
        },
        {
          id: 'final',
          label: 'Violent Death or Life-Threatening Event',
          value: 'Final: Label - Violent Graphic - Brutality - Violent Death',
        },
        {
          id: 'final',
          label: 'Brutality',
          value: 'Final: Label - Violent Graphic - Brutality - Brutality',
        },
      ],
    },
    'violent-gore': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Non-medical objects piercing the skin',
          value: 'Final: Label - Violent Graphic - Gore - Non-medical piercing',
        },
        {
          id: 'final',
          label: 'Bleeding gums and teeth',
          value: 'Final: Label - Violent Graphic - Gore - Bleeding gums/teeth',
        },
        {
          id: 'final',
          label: 'Human Waste and Bodily Fluids',
          value: 'Final: Label - Violent Graphic - Gore - Waste/Bodily Fluids',
        },
        {
          id: 'final',
          label: 'Dead body is partially or fully uncovered',
          value: 'Final: Label - Violent Graphic - Gore - Dead body uncovered',
        },
        {
          id: 'final',
          label: 'Graphic Historical Imagery',
          value: 'Final: Label - Violent Graphic - Gore - Historical Imagery',
        },
      ],
    },
    'violent-dead-babies': {
      question: 'What is the context?',
      options: [
        {
          id: 'final',
          label: 'Head of another person is visible',
          value: 'Final: Label - Violent Graphic - Dead Babies - Head visible',
        },
        {
          id: 'final',
          label: 'Any other context',
          value: 'Final: Label - Violent Graphic - Dead Babies - Other context',
        },
      ],
    },
    'violent-medical': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Needles piercing the skin',
          value: 'Final: Label - Violent Graphic - Medical - Needles piercing',
        },
        {
          id: 'final',
          label: 'Injured Human in a medical context',
          value: 'Final: Label - Violent Graphic - Medical - Injured human',
        },
      ],
    },
    'violent-armament': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Armament pointed at the viewer',
          value:
            'Final: Label - Violent Graphic - Armament - Pointed at viewer',
        },
        {
          id: 'final',
          label: 'Armament pointed at another person',
          value:
            'Final: Label - Violent Graphic - Armament - Pointed at person',
        },
      ],
    },
    'violent-animal': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Mutilated Animals',
          value: 'Final: Label - Violent Graphic - Animal - Mutilated',
        },
        {
          id: 'final',
          label: 'Animals going from live to dead (no dismemberment)',
          value: 'Final: Label - Violent Graphic - Animal - Live to dead',
        },
        {
          id: 'final',
          label: 'Brutality against an animal',
          value: 'Final: Label - Violent Graphic - Animal - Brutality',
        },
        {
          id: 'final',
          label: 'Birthing Context',
          value: 'Final: Label - Violent Graphic - Animal - Birthing',
        },
        {
          id: 'final',
          label: 'Animal with visible blood',
          value: 'Final: Label - Violent Graphic - Animal - Visible blood',
        },
        {
          id: 'final',
          label: 'Animals with insects coming out of them',
          value: 'Final: Label - Violent Graphic - Animal - Insects',
        },
        {
          id: 'final',
          label: 'Live Animal Suffering',
          value: 'Final: Label - Violent Graphic - Animal - Live suffering',
        },
      ],
    },
    'violent-fictional': {
      question: 'What exactly?',
      options: [
        {
          id: 'final',
          label: 'Mutilated Humans',
          value:
            'Final: Label - Violent Graphic - Fictional - Mutilated Humans',
        },
        {
          id: 'final',
          label: 'Photorealistic graphic imagery of humans (except mutilation)',
          value:
            'Final: Label - Violent Graphic - Fictional - Photorealistic humans',
        },
        {
          id: 'final',
          label: 'Photorealistic armament pointed at the viewer',
          value:
            'Final: Label - Violent Graphic - Fictional - Armament at viewer',
        },
        {
          id: 'final',
          label: 'Photorealistic graphic imagery of animals',
          value:
            'Final: Label - Violent Graphic - Fictional - Photorealistic animals',
        },
      ],
    },

    // ===== LABEL - ADULT NUDITY AND SEXUAL ACTIVITY =====
    'label-adult-nudity': {
      question: 'What type of content?',
      options: [
        {
          id: 'adult-nudity-photo',
          label: 'Photorealistic imagery',
          value: '1',
        },
        { id: 'adult-nudity-digital', label: 'Digital imagery', value: '2' },
        { id: 'adult-nudity-art', label: 'Real world art', value: '3' },
      ],
    },
  };

  // Função para gerar opções dinâmicas para Adult Nudity (mesmo para todos os 3 tipos)
  const getAdultNudityOptions = (isArt = false) => {
    const commonOptions = [
      {
        id: 'adult-explicit',
        label: 'Explicit sexual activity or stimulation',
        value: '1',
      },
      {
        id: 'adult-implicit',
        label: 'Implicit sexual activity or stimulation',
        value: '2',
      },
      {
        id: 'adult-other',
        label: 'Other sexual activity or stimulation',
        value: '3',
      },
      { id: 'adult-fetish', label: 'Fetish', value: '4' },
      {
        id: 'final',
        label: 'Sexual audio (10 seconds or longer)',
        value: 'Final: Label - Adult Nudity - Sexual audio 10s+',
      },
      {
        id: 'adult-genitalia',
        label: 'Visible genitalia, anuses, or visible buttocks',
        value: '6',
      },
      { id: 'adult-nipples', label: 'Visible female nipples', value: '7' },
      {
        id: 'final',
        label: 'Upskirt imagery',
        value: 'Final: Label - Adult Nudity - Upskirt imagery',
      },
      {
        id: 'final',
        label: 'Sexually suggestive pose AND near nudity',
        value: 'Final: Label - Adult Nudity - Suggestive pose + near nudity',
      },
      {
        id: 'final',
        label:
          'Sexually suggestive pose AND the focus of the image is crotch or buttocks',
        value:
          'Final: Label - Adult Nudity - Suggestive pose + crotch/buttocks',
      },
      {
        id: 'final',
        label: 'Near nudity',
        value: 'Final: Label - Adult Nudity - Near nudity',
      },
      {
        id: 'final',
        label:
          'Crotch, buttocks, or female breasts) are the focus of the image',
        value: 'Final: Label - Adult Nudity - Focus on body parts',
      },
      {
        id: 'final',
        label: 'Sex-related activity',
        value: 'Final: Label - Adult Nudity - Sex-related activity',
      },
      {
        id: 'final',
        label: 'Simulating sexual activity',
        value: 'Final: Label - Adult Nudity - Simulating sexual activity',
      },
      {
        id: 'final',
        label:
          'Gestures that signify genitalia, masturbation, oral sex, or sexual intercourse',
        value: 'Final: Label - Adult Nudity - Sexual gestures',
      },
      {
        id: 'final',
        label:
          'Logos, screenshots, or video clips of known pornographic websites',
        value: 'Final: Label - Adult Nudity - Pornographic website content',
      },
      {
        id: 'final',
        label: 'Sexual audio (less than 10 seconds)',
        value: 'Final: Label - Adult Nudity - Sexual audio <10s',
      },
      {
        id: 'final',
        label:
          'Animals engaged in sexual activity, or when their genitals are visible',
        value: 'Final: Label - Adult Nudity - Animals sexual activity',
      },
      {
        id: 'final',
        label: 'Sexually suggestive pose',
        value: 'Final: Label - Adult Nudity - Sexually suggestive pose',
      },
    ];

    if (!isArt) {
      // Para Photorealistic e Digital, adicionar opções específicas
      commonOptions.splice(8, 0, {
        id: 'final',
        label:
          "Videos that focus on commonly sexualized body parts recorded without PDITI's awareness",
        value: 'Final: Label - Adult Nudity - Recorded without awareness',
      });
      commonOptions.push(
        {
          id: 'final',
          label: 'Stripping or passive stripping',
          value: 'Final: Label - Adult Nudity - Stripping',
        },
        {
          id: 'final',
          label: 'PDITI wearing revealing clothing',
          value: 'Final: Label - Adult Nudity - Revealing clothing',
        },
        {
          id: 'final',
          label: 'Sexually touching or moving commonly sexualized body parts',
          value: 'Final: Label - Adult Nudity - Sexual touching',
        }
      );
    }

    return commonOptions;
  };

  // Adicionar steps dinâmicos para Adult Nudity
  steps['adult-nudity-photo'] = {
    question: 'What exactly?',
    options: getAdultNudityOptions(),
  };
  steps['adult-nudity-digital'] = {
    question: 'What exactly?',
    options: getAdultNudityOptions(),
  };
  steps['adult-nudity-art'] = {
    question: 'What exactly?',
    options: getAdultNudityOptions(true), // Real world art tem menos opções
  };

  // Subcategorias de Adult Nudity
  steps['adult-explicit'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Sexual activity - intercourse',
        value: 'Final: Label - Adult Nudity - Explicit - Intercourse',
      },
      {
        id: 'final',
        label: 'Sexual activity - oral sex',
        value: 'Final: Label - Adult Nudity - Explicit - Oral sex',
      },
      {
        id: 'final',
        label: 'Stimulation - genitalia / anus',
        value: 'Final: Label - Adult Nudity - Explicit - Genitalia stimulation',
      },
    ],
  };

  steps['adult-implicit'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Sexual activity - intercourse',
        value: 'Final: Label - Adult Nudity - Implicit - Intercourse',
      },
      {
        id: 'final',
        label: 'Sexual activity - oral sex',
        value: 'Final: Label - Adult Nudity - Implicit - Oral sex',
      },
      {
        id: 'final',
        label: 'Stimulation - genitalia / anus',
        value: 'Final: Label - Adult Nudity - Implicit - Genitalia stimulation',
      },
    ],
  };

  steps['adult-other'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Erection',
        value: 'Final: Label - Adult Nudity - Other - Erection',
      },
      {
        id: 'final',
        label: 'By-products of sexual activity',
        value: 'Final: Label - Adult Nudity - Other - By-products',
      },
      {
        id: 'final',
        label: "Placement on or insertion of a sex toy into a person's mouth",
        value: 'Final: Label - Adult Nudity - Other - Sex toy',
      },
      {
        id: 'final',
        label: 'Stimulation of a visible male / female nipple',
        value: 'Final: Label - Adult Nudity - Other - Nipple stimulation',
      },
      {
        id: 'final',
        label: 'Squeezing of a female breast',
        value: 'Final: Label - Adult Nudity - Other - Breast squeezing',
      },
    ],
  };

  steps['adult-fetish'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Acts likely to lead to the death of a person or animal',
        value: 'Final: Label - Adult Nudity - Fetish - Death acts',
      },
      {
        id: 'final',
        label: 'Dismemberment',
        value: 'Final: Label - Adult Nudity - Fetish - Dismemberment',
      },
      {
        id: 'final',
        label: 'Cannibalism',
        value: 'Final: Label - Adult Nudity - Fetish - Cannibalism',
      },
      {
        id: 'final',
        label: 'Feces, urine, spit, snot, menstruation or vomit',
        value: 'Final: Label - Adult Nudity - Fetish - Bodily fluids',
      },
      {
        id: 'final',
        label: 'Bestiality',
        value: 'Final: Label - Adult Nudity - Fetish - Bestiality',
      },
      {
        id: 'final',
        label: 'Incest',
        value: 'Final: Label - Adult Nudity - Fetish - Incest',
      },
      {
        id: 'final',
        label:
          'BDSM (bondage and discipline, domination and submission, sadism and masochism)',
        value: 'Final: Label - Adult Nudity - Fetish - BDSM',
      },
    ],
  };

  steps['adult-genitalia'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Genitalia - penis',
        value: 'Final: Label - Adult Nudity - Genitalia - Penis',
      },
      {
        id: 'final',
        label: 'Genitalia - vagina',
        value: 'Final: Label - Adult Nudity - Genitalia - Vagina',
      },
      {
        id: 'final',
        label: 'Genitalia - penis obscured by pubic hair only',
        value: 'Final: Label - Adult Nudity - Genitalia - Penis obscured hair',
      },
      {
        id: 'final',
        label: 'Genitalia - vagina obscured by pubic hair only',
        value: 'Final: Label - Adult Nudity - Genitalia - Vagina obscured hair',
      },
      {
        id: 'final',
        label: 'Genitalia - penis obscured by digital overlay or obscurement',
        value:
          'Final: Label - Adult Nudity - Genitalia - Penis digital overlay',
      },
      {
        id: 'final',
        label: 'Genitalia - vagina obscured by digital overlay or obscurement',
        value:
          'Final: Label - Adult Nudity - Genitalia - Vagina digital overlay',
      },
      {
        id: 'final',
        label: 'Visible body part - anus',
        value: 'Final: Label - Adult Nudity - Genitalia - Anus',
      },
      {
        id: 'final',
        label: 'Visible body part - buttocks',
        value: 'Final: Label - Adult Nudity - Genitalia - Buttocks',
      },
    ],
  };

  steps['adult-nipples'] = {
    question: 'What is the context?',
    options: [
      {
        id: 'final',
        label: 'Medical or health context (including mastectomy)',
        value: 'Final: Label - Adult Nudity - Nipples - Medical context',
      },
      {
        id: 'final',
        label:
          'Famine, genocide, war crimes, or crimes against humanity context',
        value: 'Final: Label - Adult Nudity - Nipples - Humanitarian context',
      },
      {
        id: 'final',
        label: 'Gender confirmation surgery context',
        value: 'Final: Label - Adult Nudity - Nipples - Gender surgery context',
      },
      {
        id: 'final',
        label: 'Act of protest context',
        value: 'Final: Label - Adult Nudity - Nipples - Protest context',
      },
      {
        id: 'final',
        label: 'Breastfeeding context',
        value: 'Final: Label - Adult Nudity - Nipples - Breastfeeding context',
      },
      {
        id: 'final',
        label: 'Any other context',
        value: 'Final: Label - Adult Nudity - Nipples - Other context',
      },
    ],
  };

  // ===== LABEL - RGS WEAPONS =====
  steps['label-weapons'] = {
    question: 'What context?',
    options: [
      {
        id: 'weapons-commercial',
        label: 'Commercial Intent or Discussion/ Advocacy',
        value: '1',
      },
      {
        id: 'final',
        label:
          'Non-Commercial Depiction (depiction without promotion or advocacy)',
        value: 'Final: Label - RGS Weapons - Non-Commercial Depiction',
      },
    ],
  };
  steps['weapons-commercial'] = {
    question: 'What kind of weapons?',
    options: [
      {
        id: 'final',
        label:
          'Machine gun conversion device OR 3D printing OR computer-aided manufacturing instructions',
        value:
          'Final: Label - RGS Weapons - Commercial - Machine gun conversion/3D printing',
      },
      {
        id: 'final',
        label: 'Firearms / Explosives / Lethal Accessories / Firearm Parts',
        value: 'Final: Label - RGS Weapons - Commercial - Firearms/Explosives',
      },
      {
        id: 'final',
        label: 'Bladed Weapon / Other Weapons',
        value: 'Final: Label - RGS Weapons - Commercial - Bladed/Other Weapons',
      },
      {
        id: 'final',
        label: 'Non-lethal Accessories',
        value:
          'Final: Label - RGS Weapons - Commercial - Non-lethal Accessories',
      },
    ],
  };

  // ===== LABEL - VIOLENCE AND INCITEMENT =====
  steps['label-violence-incitement'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Election Violence',
        value: 'Final: Label - Violence and Incitement - Election Violence',
      },
      {
        id: 'violence-high-severity',
        label: 'High-severity violence',
        value: '2',
      },
      {
        id: 'violence-mid-severity',
        label: 'Mid-severity violence',
        value: '3',
      },
      {
        id: 'final',
        label: 'Low-severity violence',
        value: 'Final: Label - Violence and Incitement - Low-severity violence',
      },
      {
        id: 'final',
        label: 'Bringing weapons to HRL or THRL',
        value:
          'Final: Label - Violence and Incitement - Bringing weapons to HRL/THRL',
      },
      { id: 'violence-other', label: 'Other Violence', value: '6' },
    ],
  };
  steps['violence-high-severity'] = {
    question: 'Is it threats or admissions?',
    options: [
      {
        id: 'final',
        label: 'Threats',
        value:
          'Final: Label - Violence and Incitement - High-severity - Threats',
      },
      {
        id: 'final',
        label: 'Threats against DOI/criminals/predators',
        value:
          'Final: Label - Violence and Incitement - High-severity - Threats against DOI',
      },
      {
        id: 'final',
        label: 'Admissions',
        value:
          'Final: Label - Violence and Incitement - High-severity - Admissions',
      },
      {
        id: 'final',
        label: 'Calls for death',
        value:
          'Final: Label - Violence and Incitement - High-severity - Calls for death',
      },
    ],
  };
  steps['violence-mid-severity'] = {
    question: 'Is it threats or admissions?',
    options: [
      {
        id: 'final',
        label: 'Threats',
        value:
          'Final: Label - Violence and Incitement - Mid-severity - Threats',
      },
      {
        id: 'final',
        label: 'Threats against DOI/criminals/predators',
        value:
          'Final: Label - Violence and Incitement - Mid-severity - Threats against DOI',
      },
      {
        id: 'final',
        label: 'Admissions',
        value:
          'Final: Label - Violence and Incitement - Mid-severity - Admissions',
      },
    ],
  };
  steps['violence-other'] = {
    question: 'What type of Other Violence?',
    options: [
      {
        id: 'final',
        label: 'Services of high-severity violence',
        value:
          'Final: Label - Violence and Incitement - Other - Services high-severity',
      },
      {
        id: 'final',
        label: 'Instructions to make or use weapons',
        value:
          'Final: Label - Violence and Incitement - Other - Instructions weapons',
      },
      {
        id: 'final',
        label: 'Instructions to make or use explosive',
        value:
          'Final: Label - Violence and Incitement - Other - Instructions explosives',
      },
      {
        id: 'final',
        label: 'Glorification of Gender-based violence',
        value:
          'Final: Label - Violence and Incitement - Other - Glorification gender violence',
      },
    ],
  };

  // ===== LABEL - HATEFUL CONDUCT =====
  steps['label-hateful'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'T1 - Comparisons to or Generalizations',
        value:
          'Final: Label - Hateful Conduct - T1 Comparisons/Generalizations',
      },
      {
        id: 'final',
        label: 'T1 - Statements supporting harm',
        value: 'Final: Label - Hateful Conduct - T1 Supporting harm',
      },
      {
        id: 'final',
        label: 'T1 - Harmful Stereotype',
        value: 'Final: Label - Hateful Conduct - T1 Harmful Stereotype',
      },
      {
        id: 'final',
        label:
          'T1 - Mocking the Concept, Events or Victims of Hate Crimes/ Mocking people on the basis of their PC',
        value: 'Final: Label - Hateful Conduct - T1 Mocking',
      },
      {
        id: 'hateful-insults',
        label: 'T2 - Insults - Character, Mental, Other',
        value: '5',
      },
      {
        id: 'final',
        label: 'T2 - Expressions of Disgust',
        value: 'Final: Label - Hateful Conduct - T2 Disgust',
      },
      {
        id: 'final',
        label: 'T2 - Targeted Cursing',
        value: 'Final: Label - Hateful Conduct - T2 Targeted Cursing',
      },
      {
        id: 'final',
        label: 'T2 - Exclusion, Segregation',
        value: 'Final: Label - Hateful Conduct - T2 Exclusion',
      },
      { id: 'hateful-slur', label: 'Slur', value: '9' },
    ],
  };
  steps['hateful-insults'] = {
    question: 'What type of Insult in the Content?',
    options: [
      {
        id: 'final',
        label: 'Character Insults',
        value: 'Final: Label - Hateful Conduct - T2 Insults - Character',
      },
      {
        id: 'final',
        label: 'Mental Insults',
        value: 'Final: Label - Hateful Conduct - T2 Insults - Mental',
      },
      {
        id: 'final',
        label: 'Other Insults',
        value: 'Final: Label - Hateful Conduct - T2 Insults - Other',
      },
    ],
  };
  steps['hateful-slur'] = {
    question: 'How is this slur used?',
    options: [
      {
        id: 'final',
        label: 'No special context',
        value: 'Final: Label - Hateful Conduct - Slur - No special context',
      },
      {
        id: 'final',
        label:
          'To mock/condemn/discuss the use of the slur, used self-referentially, or in an explicitly positive context',
        value:
          'Final: Label - Hateful Conduct - Slur - Mock/condemn/positive context',
      },
    ],
  };

  // ===== LABEL - BULLYING AND HARASSMENT =====
  const getBullyingTargetOptions = () => [
    {
      id: 'final',
      label: 'Reporter',
      value: 'Final: Label - Bullying and Harassment - Target - Reporter',
    },
    {
      id: 'final',
      label: 'Parent Post/Media owner',
      value:
        'Final: Label - Bullying and Harassment - Target - Parent Post owner',
    },
    {
      id: 'final',
      label: 'A user tagged/mentioned in the post/media caption',
      value:
        'Final: Label - Bullying and Harassment - Target - Tagged in caption',
    },
    {
      id: 'final',
      label: 'A user tagged/mentioned within media',
      value:
        'Final: Label - Bullying and Harassment - Target - Tagged in media',
    },
    {
      id: 'final',
      label: 'Parent comment owner',
      value:
        'Final: Label - Bullying and Harassment - Target - Parent comment owner',
    },
    {
      id: 'final',
      label: 'A user tagged/mentioned in the comment(s)',
      value:
        'Final: Label - Bullying and Harassment - Target - Tagged in comments',
    },
    {
      id: 'final',
      label: 'Owner of shared media',
      value:
        'Final: Label - Bullying and Harassment - Target - Shared media owner',
    },
    {
      id: 'final',
      label: 'A person depicted in the image/video (PDITI/PDITV)',
      value:
        'Final: Label - Bullying and Harassment - Target - Person depicted',
    },
    {
      id: 'final',
      label: 'Other',
      value: 'Final: Label - Bullying and Harassment - Target - Other',
    },
  ];

  steps['label-bullying'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'bullying-sexualized',
        label: 'Sexualized Harrassment',
        value: '1',
      },
      {
        id: 'bullying-death-calls',
        label:
          'Calls for death, SSI or to contract or develop a medical condition',
        value: '2',
      },
      {
        id: 'bullying-sexual-claims',
        label:
          'Claims about sexual activity, romantic involvement and gender identity',
        value: '3',
      },
      {
        id: 'bullying-violent-tragedies',
        label: 'Violent Tragedies',
        value: '4',
      },
      {
        id: 'bullying-negative-comparison',
        label: 'Negative Comparison to animals/inanimate objects',
        value: '5',
      },
      {
        id: 'bullying-negative-physical',
        label: 'Negative physical description',
        value: '6',
      },
      {
        id: 'bullying-gendered-cursing',
        label: 'Targeted and female gendered Cursing',
        value: '7',
      },
      {
        id: 'bullying-negative-character',
        label: 'Negative Character/Contempt/Exclusion',
        value: '8',
      },
      { id: 'bullying-physical', label: 'Physical bullying', value: '9' },
      {
        id: 'bullying-non-negative',
        label: 'Non-Negative Comparison/claims/description',
        value: '0',
      },
      { id: 'bullying-other', label: 'Other', value: 'A' },
    ],
  };

  // Criar steps para cada tipo de bullying que pergunta "Who is the target?"
  [
    'bullying-sexualized',
    'bullying-death-calls',
    'bullying-sexual-claims',
    'bullying-violent-tragedies',
    'bullying-negative-comparison',
    'bullying-negative-physical',
    'bullying-gendered-cursing',
    'bullying-negative-character',
    'bullying-non-negative',
    'bullying-other',
  ].forEach(stepId => {
    steps[stepId] = {
      question: 'Who is the target? (Select all that apply)',
      options: getBullyingTargetOptions(),
    };
  });

  steps['bullying-physical'] = {
    question:
      'Is this a video of physical bullying against minors, shared in a condemning context?',
    options: [
      {
        id: 'final',
        label: 'Yes',
        value:
          'Final: Label - Bullying and Harassment - Physical - Condemning context Yes',
      },
      { id: 'bullying-physical-no', label: 'No', value: '2' },
    ],
  };
  steps['bullying-physical-no'] = {
    question: 'Who is the target? (Select all that apply)',
    options: getBullyingTargetOptions(),
  };

  // ===== LABEL - COORDINATING HARM =====
  steps['label-coordinating-harm'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Outing',
        value: 'Final: Label - Coordinating Harm - Outing',
      },
      {
        id: 'final',
        label: 'Harm Against Animals',
        value: 'Final: Label - Coordinating Harm - Harm Against Animals',
      },
      {
        id: 'final',
        label: 'Harm Against Property',
        value: 'Final: Label - Coordinating Harm - Harm Against Property',
      },
      {
        id: 'final',
        label: 'Voting Interference',
        value: 'Final: Label - Coordinating Harm - Voting Interference',
      },
      {
        id: 'final',
        label: 'Census Interference',
        value: 'Final: Label - Coordinating Harm - Census Interference',
      },
      {
        id: 'final',
        label: 'High-Risk Viral Challenges',
        value: 'Final: Label - Coordinating Harm - High-Risk Viral Challenges',
      },
      {
        id: 'final',
        label: 'Other Harm Against People',
        value: 'Final: Label - Coordinating Harm - Other Harm Against People',
      },
    ],
  };

  // ===== LABEL - FRAUD SCAMS =====
  steps['label-fraud'] = {
    question: 'What Fraud and Deception?',
    options: [
      { id: 'fraud-loan', label: 'Loan Fraud and Scam', value: '1' },
      {
        id: 'final',
        label: 'Gambling Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Gambling Fraud',
      },
      {
        id: 'final',
        label: 'Investment or Financial Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Investment/Financial Fraud',
      },
      {
        id: 'final',
        label: 'Money Muling and Laundering Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Money Muling/Laundering',
      },
      {
        id: 'fraud-identity',
        label: 'Inauthentic Identity Fraud and Scam',
        value: '5',
      },
      {
        id: 'fraud-product',
        label: 'Product or Reward Fraud and Scam',
        value: '6',
      },
      {
        id: 'final',
        label: 'Fake Documents Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Fake Documents',
      },
      {
        id: 'fraud-stolen',
        label: 'Stolen Information, Goods or Services Fraud and Scam',
        value: '8',
      },
      {
        id: 'fraud-devices',
        label: 'Unauthorized Use of Devices Fraud and Scam',
        value: '9',
      },
      {
        id: 'fraud-deceptive',
        label: 'Deceptive and Misleading Practices',
        value: '0',
      },
    ],
  };
  steps['fraud-loan'] = {
    question: 'Which Loan Fraud and Scam?',
    options: [
      {
        id: 'final',
        label: 'Loan Scam',
        value: 'Final: Label - Fraud/Scams - Loan - Scam',
      },
      {
        id: 'final',
        label: 'Loan Products',
        value: 'Final: Label - Fraud/Scams - Loan - Products',
      },
    ],
  };
  steps['fraud-identity'] = {
    question: 'Which Inauthentic Identity Fraud and Scam?',
    options: [
      {
        id: 'final',
        label: 'Charity Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Identity - Charity',
      },
      {
        id: 'final',
        label: 'Romance Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Identity - Romance',
      },
      {
        id: 'final',
        label: 'Established Business Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Identity - Business',
      },
    ],
  };
  steps['fraud-product'] = {
    question: 'Which Product or Reward Fraud and Scam?',
    options: [
      {
        id: 'final',
        label: 'Government Grant Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Government Grant',
      },
      {
        id: 'final',
        label: 'Tangible, spiritual or Illuminati Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Tangible/spiritual',
      },
      {
        id: 'final',
        label: 'Insurance Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Insurance',
      },
      {
        id: 'final',
        label: 'Job Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Job',
      },
      {
        id: 'final',
        label: 'Debt Relief and Credit Repair Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Debt Relief',
      },
      {
        id: 'final',
        label: 'Giveaway Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Giveaway',
      },
      {
        id: 'final',
        label: 'Advance Fee Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Product - Advance Fee',
      },
    ],
  };
  steps['fraud-stolen'] = {
    question:
      'Which type of Stolen Information, Goods or Services Fraud and Scam?',
    options: [
      {
        id: 'final',
        label: 'Carding Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Stolen - Carding',
      },
      {
        id: 'final',
        label: 'PII Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Stolen - PII',
      },
      {
        id: 'final',
        label: 'Fake Reviews Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Stolen - Fake Reviews',
      },
      {
        id: 'final',
        label: 'Subscription Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Stolen - Subscription',
      },
      {
        id: 'final',
        label: 'Cheating Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Stolen - Cheating',
      },
    ],
  };
  steps['fraud-devices'] = {
    question: 'Which type of Unauthorized Use of Devices Fraud and Scam?',
    options: [
      {
        id: 'final',
        label: 'Device Manipulation Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Devices - Manipulation',
      },
      {
        id: 'final',
        label: 'Digital Content Fraud and Scam',
        value: 'Final: Label - Fraud/Scams - Devices - Digital Content',
      },
    ],
  };
  steps['fraud-deceptive'] = {
    question: 'What Deceptive and Misleading Practice?',
    options: [
      {
        id: 'final',
        label: 'Misleading Health Practices',
        value: 'Final: Label - Fraud/Scams - Deceptive - Health Practices',
      },
      {
        id: 'final',
        label: 'Financial Instruments',
        value: 'Final: Label - Fraud/Scams - Deceptive - Financial Instruments',
      },
    ],
  };

  // ===== LABEL - RGS TOBACCO AND ALCOHOL =====
  steps['label-tobacco'] = {
    question: 'What abuse type do you see?',
    options: [
      {
        id: 'tobacco-products',
        label: 'Tobacco and Related Products',
        value: '1',
      },
      { id: 'tobacco-alcohol', label: 'Alcohol', value: '2' },
    ],
  };
  steps['tobacco-products'] = {
    question: 'What type of smoking-related product do you see?',
    options: [
      {
        id: 'tobacco-nicotine',
        label: 'Tobacco/nicotine or simulation product',
        value: '1',
      },
      {
        id: 'tobacco-cessation',
        label: 'Smoking cessation product',
        value: '2',
      },
    ],
  };
  steps['tobacco-nicotine'] = {
    question: 'In what context?',
    options: [
      {
        id: 'final',
        label: 'Peer-to-Peer Context (Sales / Asks)',
        value: 'Final: Label - RGS Tobacco - Nicotine - P2P Sales',
      },
      {
        id: 'final',
        label: 'Promotion / Brand Promotion / Consumption',
        value: 'Final: Label - RGS Tobacco - Nicotine - Promotion/Consumption',
      },
      {
        id: 'final',
        label: 'Sale (Brick-and-Mortar)',
        value: 'Final: Label - RGS Tobacco - Nicotine - Brick-and-Mortar Sale',
      },
      {
        id: 'final',
        label: 'Incidental Consumption',
        value: 'Final: Label - RGS Tobacco - Nicotine - Incidental Consumption',
      },
      {
        id: 'final',
        label:
          'Tobacco Event or Venue / Depiction of Brand or Product / Admission or advocacy for legality or scientific merits of usage',
        value: 'Final: Label - RGS Tobacco - Nicotine - Event/Venue/Brand',
      },
    ],
  };
  steps['tobacco-cessation'] = {
    question: 'Is the cessation product FDA or WHO approved?',
    options: [
      {
        id: 'final',
        label: 'Yes',
        value: 'Final: Label - RGS Tobacco - Cessation - FDA/WHO Approved',
      },
      {
        id: 'final',
        label: 'No',
        value: 'Final: Label - RGS Tobacco - Cessation - Not Approved',
      },
    ],
  };
  steps['tobacco-alcohol'] = {
    question: 'What is present in relation to the alcohol?',
    options: [
      {
        id: 'final',
        label: 'Peer-to-Peer Context (Sales / Asks)',
        value: 'Final: Label - RGS Tobacco - Alcohol - P2P Sales',
      },
      {
        id: 'final',
        label: 'Events / Venues / Consumption / Promotion / Brand Promotion',
        value:
          'Final: Label - RGS Tobacco - Alcohol - Events/Venues/Consumption',
      },
      {
        id: 'final',
        label: 'Sale (Brick-and-Mortar)',
        value: 'Final: Label - RGS Tobacco - Alcohol - Brick-and-Mortar Sale',
      },
      {
        id: 'final',
        label: 'Recipe',
        value: 'Final: Label - RGS Tobacco - Alcohol - Recipe',
      },
      {
        id: 'final',
        label: 'Depiction of Brand',
        value: 'Final: Label - RGS Tobacco - Alcohol - Brand Depiction',
      },
    ],
  };

  // ===== LABEL - RGS HEALTH AND WELLNESS =====
  steps['label-health'] = {
    question: 'What abuse type do you see?',
    options: [
      {
        id: 'final',
        label: 'Adult Sexual Businesses or Sexual Arousal Product',
        value: 'Final: Label - RGS Health - Sexual Businesses/Products',
      },
      {
        id: 'health-genital',
        label: 'Adult Genital Procedures or Surgeries',
        value: '2',
      },
      {
        id: 'health-reproductive',
        label: 'Reproductive Health & Wellness Products',
        value: '3',
      },
      {
        id: 'final',
        label: 'Family Planning Services',
        value: 'Final: Label - RGS Health - Family Planning',
      },
      {
        id: 'final',
        label: 'Sex Education with sexual focus',
        value: 'Final: Label - RGS Health - Sex Education',
      },
      {
        id: 'health-weight',
        label: 'Weight Loss Products or Services',
        value: '6',
      },
      {
        id: 'health-cosmetic',
        label: 'Cosmetic Products, Procedures or Surgeries',
        value: '7',
      },
    ],
  };
  steps['health-genital'] = {
    question: 'What do you see?',
    options: [
      {
        id: 'final',
        label: 'Focused on Sexual Pleasure',
        value: 'Final: Label - RGS Health - Genital - Sexual Pleasure',
      },
      {
        id: 'final',
        label: 'Cosmetic Genital Surgeries',
        value: 'Final: Label - RGS Health - Genital - Cosmetic Surgeries',
      },
      {
        id: 'final',
        label: 'Adult Genital Surgeries',
        value: 'Final: Label - RGS Health - Genital - Adult Surgeries',
      },
    ],
  };
  steps['health-reproductive'] = {
    question: 'What do you see?',
    options: [
      {
        id: 'final',
        label: 'Focused on sexual pleasure',
        value: 'Final: Label - RGS Health - Reproductive - Sexual pleasure',
      },
      {
        id: 'final',
        label: 'Reproductive Disorder Products',
        value: 'Final: Label - RGS Health - Reproductive - Disorder Products',
      },
      {
        id: 'final',
        label: 'Reproductive Health or Wellness Products',
        value: 'Final: Label - RGS Health - Reproductive - Health Products',
      },
    ],
  };
  steps['health-weight'] = {
    question: 'What content do you see?',
    options: [
      {
        id: 'final',
        label: 'Negative Self Image (before/after transformation)',
        value: 'Final: Label - RGS Health - Weight - Negative Self Image',
      },
      {
        id: 'final',
        label: 'Weight Loss Products',
        value: 'Final: Label - RGS Health - Weight - Products',
      },
    ],
  };
  steps['health-cosmetic'] = {
    question: 'What content do you see?',
    options: [
      {
        id: 'final',
        label: 'Skin Whitening',
        value: 'Final: Label - RGS Health - Cosmetic - Skin Whitening',
      },
      {
        id: 'final',
        label: 'Transformation Depiction',
        value: 'Final: Label - RGS Health - Cosmetic - Transformation',
      },
      {
        id: 'final',
        label: 'General Cosmetic Products and Procedures',
        value: 'Final: Label - RGS Health - Cosmetic - General Products',
      },
      {
        id: 'final',
        label: 'Cosmetic Services',
        value: 'Final: Label - RGS Health - Cosmetic - Services',
      },
    ],
  };

  // ===== LABEL - RGS GAMBLING =====
  steps['label-gambling'] = {
    question: 'Which gambling violation type is present?',
    options: [
      {
        id: 'gambling-sell-trade',
        label: 'Sell/Trade and/or Promotion of Gambling',
        value: '1',
      },
      {
        id: 'final',
        label:
          'Physical, real-money gambling activity or establishments, e.g., "brick and mortar casinos"',
        value: 'Final: Label - RGS Gambling - Physical establishments',
      },
      {
        id: 'final',
        label: 'State or government lottery',
        value: 'Final: Label - RGS Gambling - State/government lottery',
      },
    ],
  };
  steps['gambling-sell-trade'] = {
    question: 'Are there real money IN signals?',
    options: [
      { id: 'gambling-in-yes', label: 'Yes', value: '1' },
      { id: 'gambling-in-no', label: 'No', value: '2' },
    ],
  };
  steps['gambling-in-yes'] = {
    question: 'Are there real money OUT signals?',
    options: [
      {
        id: 'final',
        label: 'Yes',
        value: 'Final: Label - RGS Gambling - Sell/Trade - IN Yes OUT Yes',
      },
      {
        id: 'final',
        label: 'No',
        value: 'Final: Label - RGS Gambling - Sell/Trade - IN Yes OUT No',
      },
    ],
  };
  steps['gambling-in-no'] = {
    question: 'Are there real money OUT signals?',
    options: [
      {
        id: 'final',
        label: 'Yes',
        value: 'Final: Label - RGS Gambling - Sell/Trade - IN No OUT Yes',
      },
      {
        id: 'final',
        label: 'No',
        value: 'Final: Label - RGS Gambling - Sell/Trade - IN No OUT No',
      },
    ],
  };

  // ===== LABEL - RGS OTHER =====
  steps['label-rgs-other'] = {
    question: 'What exactly?',
    options: [
      { id: 'rgs-other-endangered', label: 'Endangered Species', value: '1' },
      { id: 'rgs-other-animals', label: 'Non-Endangered Animals', value: '2' },
      {
        id: 'final',
        label: 'Body Parts and Fluids',
        value: 'Final: Label - RGS Other - Body Parts/Fluids',
      },
      {
        id: 'final',
        label: 'Hazardous Goods and Materials',
        value: 'Final: Label - RGS Other - Hazardous Goods',
      },
      {
        id: 'final',
        label: 'Historical Artifacts',
        value: 'Final: Label - RGS Other - Historical Artifacts',
      },
    ],
  };
  steps['rgs-other-endangered'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label:
          'Buy / Sell / Trade / Donate / Gift / Ask for Endangered Species',
        value: 'Final: Label - RGS Other - Endangered - Buy/Sell/Trade',
      },
      {
        id: 'final',
        label: 'Other Endangered Species Violation',
        value: 'Final: Label - RGS Other - Endangered - Other Violation',
      },
      {
        id: 'final',
        label: 'Non-Sanctioned Environment',
        value:
          'Final: Label - RGS Other - Endangered - Non-Sanctioned Environment',
      },
    ],
  };
  steps['rgs-other-animals'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Buy / Sell / Trade',
        value: 'Final: Label - RGS Other - Animals - Buy/Sell/Trade',
      },
      {
        id: 'final',
        label: 'Animal Adoption',
        value: 'Final: Label - RGS Other - Animals - Adoption',
      },
    ],
  };

  // ===== LABEL - RGS RECALLED PRODUCTS =====
  steps['label-recalled'] = {
    question: 'In what context?',
    options: [
      {
        id: 'final',
        label: 'Buy/Sell/Trade/Donate/Gift/Ask',
        value: 'Final: Label - RGS Recalled - Buy/Sell/Trade/Donate',
      },
      {
        id: 'final',
        label: 'Promotion/Education',
        value: 'Final: Label - RGS Recalled - Promotion/Education',
      },
    ],
  };

  // ===== LABEL - PRIVACY VIOLATION =====
  steps['label-privacy'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'privacy-pii',
        label: 'Personally Identifiable Information (PII)',
        value: '1',
      },
      {
        id: 'final',
        label: 'Contact or residential information',
        value: 'Final: Label - Privacy Violation - Contact/residential info',
      },
      {
        id: 'final',
        label: 'Financial information',
        value: 'Final: Label - Privacy Violation - Financial information',
      },
      {
        id: 'final',
        label: 'Medical information',
        value: 'Final: Label - Privacy Violation - Medical information',
      },
      {
        id: 'final',
        label: 'Information from hacked sources',
        value: 'Final: Label - Privacy Violation - Hacked sources',
      },
      { id: 'privacy-attributes', label: 'Personal attributes', value: '6' },
    ],
  };
  steps['privacy-pii'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Of self',
        value: 'Final: Label - Privacy Violation - PII - Of self',
      },
      {
        id: 'final',
        label: 'Of others',
        value: 'Final: Label - Privacy Violation - PII - Of others',
      },
    ],
  };
  steps['privacy-attributes'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'PII of user or family',
        value:
          'Final: Label - Privacy Violation - Attributes - PII user/family',
      },
      {
        id: 'final',
        label: 'Financial attributes',
        value: 'Final: Label - Privacy Violation - Attributes - Financial',
      },
      {
        id: 'final',
        label: 'Health attributes or medical condition',
        value: 'Final: Label - Privacy Violation - Attributes - Health/medical',
      },
      {
        id: 'final',
        label: 'Personal attributes',
        value: 'Final: Label - Privacy Violation - Attributes - Personal',
      },
      {
        id: 'final',
        label: 'Voter status',
        value: 'Final: Label - Privacy Violation - Attributes - Voter status',
      },
    ],
  };

  // ===== LABEL - CYBERSECURITY =====
  steps['label-cybersecurity'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Phishing',
        value: 'Final: Label - Cybersecurity - Phishing',
      },
      {
        id: 'final',
        label: 'Social Engineering',
        value: 'Final: Label - Cybersecurity - Social Engineering',
      },
      {
        id: 'final',
        label: 'Publicly Sharing Login Information',
        value: 'Final: Label - Cybersecurity - Sharing Login Info',
      },
      {
        id: 'final',
        label: 'Automatic Download',
        value: 'Final: Label - Cybersecurity - Automatic Download',
      },
      {
        id: 'final',
        label: 'Circumventing Security Systems',
        value: 'Final: Label - Cybersecurity - Circumventing Security',
      },
      {
        id: 'final',
        label: 'Disrupt Communication or Signal Sharing',
        value: 'Final: Label - Cybersecurity - Disrupt Communication',
      },
    ],
  };

  // ===== LABEL - SPAM =====
  steps['label-spam'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'spam-engagement',
        label: 'Requests for Purchase & Sale of Engagement or Site Privileges',
        value: '1',
      },
      {
        id: 'final',
        label: 'Giveaways and Exchanges',
        value: 'Final: Label - Spam - Giveaways/Exchanges',
      },
      {
        id: 'final',
        label: 'Engagement Gating',
        value: 'Final: Label - Spam - Engagement Gating',
      },
      {
        id: 'final',
        label: 'Non-Existent Functionality',
        value: 'Final: Label - Spam - Non-Existent Functionality',
      },
      { id: 'spam-deceptive', label: 'Deceptive Link', value: '5' },
    ],
  };
  steps['spam-engagement'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Platform Assets / Privileges',
        value: 'Final: Label - Spam - Engagement - Platform Assets',
      },
      {
        id: 'final',
        label: 'Content',
        value: 'Final: Label - Spam - Engagement - Content',
      },
      {
        id: 'final',
        label: 'Engagement',
        value: 'Final: Label - Spam - Engagement - Engagement',
      },
    ],
  };
  steps['spam-deceptive'] = {
    question: 'What exactly?',
    options: [
      {
        id: 'final',
        label: 'Misleading Link',
        value: 'Final: Label - Spam - Deceptive - Misleading Link',
      },
      {
        id: 'final',
        label: 'Like or share-gating',
        value: 'Final: Label - Spam - Deceptive - Like/share-gating',
      },
      {
        id: 'final',
        label: 'Deceptive Platform Functionality',
        value: 'Final: Label - Spam - Deceptive - Platform Functionality',
      },
      {
        id: 'final',
        label: 'Landing page or domain impersonation',
        value: 'Final: Label - Spam - Deceptive - Domain impersonation',
      },
    ],
  };

  const handleDecisionSelect = option => {
    const newPath = [...decisionPath, option.label];
    setDecisionPath(newPath);

    if (option.id === 'final') {
      // É uma decisão final - limpar o "Final: " do início
      const cleanDecision = option.value.replace('Final: ', '');
      onDecisionComplete(cleanDecision);
    } else {
      // Navega para o próximo step
      setCurrentStep(option.id);
    }
  };

  const handleBackNavigation = () => {
    // Remover último item do path
    const newPath = decisionPath.slice(0, -1);
    setDecisionPath(newPath);

    // Lógica de navegação para voltar - baseada na estrutura da árvore
    if (currentStep === 'decision-tree') return;

    // No Action branch
    if (currentStep === 'no-action-text') setCurrentStep('no-action-implicit');
    else if (currentStep === 'no-action-implicit') setCurrentStep('no-action');
    else if (currentStep === 'no-action') setCurrentStep('decision-tree');
    // Escalate branch
    else if (currentStep.startsWith('escalate-child-'))
      setCurrentStep('escalate-child');
    else if (currentStep.startsWith('escalate-trafficking-'))
      setCurrentStep('escalate-trafficking');
    else if (currentStep.startsWith('escalate-smuggling-'))
      setCurrentStep('escalate-smuggling');
    else if (currentStep.startsWith('escalate-threatening-'))
      setCurrentStep('escalate-threatening');
    else if (currentStep.startsWith('escalate-') && currentStep !== 'escalate')
      setCurrentStep('escalate');
    else if (currentStep === 'escalate') setCurrentStep('decision-tree');
    // Label branch - Main categories
    else if (
      currentStep.startsWith('suicide-') ||
      currentStep.startsWith('eating-') ||
      currentStep.startsWith('self-injury-')
    ) {
      if (currentStep.includes('admission-detail'))
        setCurrentStep('suicide-admission');
      else if (currentStep.includes('promotion'))
        setCurrentStep('suicide-suicide');
      else if (currentStep.includes('graphic'))
        setCurrentStep('suicide-suicide');
      else if (currentStep.includes('mocking'))
        setCurrentStep('suicide-suicide');
      else if (currentStep.includes('admission'))
        setCurrentStep('suicide-suicide');
      else if (currentStep.startsWith('eating-'))
        setCurrentStep('suicide-eating');
      else if (currentStep.startsWith('self-injury-'))
        setCurrentStep('suicide-self-injury');
      else setCurrentStep('label-suicide');
    } else if (currentStep.startsWith('child-'))
      setCurrentStep('label-child-exploitation');
    else if (currentStep.startsWith('human-'))
      setCurrentStep('label-human-exploitation');
    else if (
      currentStep.startsWith('drugs-') ||
      currentStep.startsWith('prescription-') ||
      currentStep.startsWith('otc-') ||
      currentStep.startsWith('cannabis-')
    ) {
      if (currentStep.includes('prescription') || currentStep.includes('otc'))
        setCurrentStep('drugs-prescription');
      else if (currentStep.includes('cannabis'))
        setCurrentStep('drugs-cannabis');
      else setCurrentStep('label-drugs');
    } else if (currentStep.startsWith('dangerous-'))
      setCurrentStep('label-dangerous-orgs');
    else if (currentStep.startsWith('ncii-') || currentStep.startsWith('ncst'))
      setCurrentStep('label-adult-sexual');
    else if (currentStep.startsWith('prostitution-'))
      setCurrentStep('label-prostitution');
    else if (currentStep.startsWith('child-nudity-'))
      setCurrentStep('label-child-nudity');
    else if (
      currentStep.startsWith('violent-') ||
      currentStep.startsWith('mutilated-')
    ) {
      if (currentStep.includes('mutilated'))
        setCurrentStep('violent-mutilated');
      else setCurrentStep('label-violent-graphic');
    } else if (
      currentStep.startsWith('adult-') &&
      !currentStep.includes('label-adult')
    ) {
      if (currentStep.includes('nudity-')) setCurrentStep('label-adult-nudity');
      else
        setCurrentStep(
          currentStep.includes('photo')
            ? 'adult-nudity-photo'
            : currentStep.includes('digital')
            ? 'adult-nudity-digital'
            : 'adult-nudity-art'
        );
    } else if (currentStep.startsWith('weapons-'))
      setCurrentStep('label-weapons');
    else if (currentStep.startsWith('violence-'))
      setCurrentStep('label-violence-incitement');
    else if (currentStep.startsWith('hateful-'))
      setCurrentStep('label-hateful');
    else if (currentStep.startsWith('bullying-'))
      setCurrentStep('label-bullying');
    else if (currentStep.startsWith('fraud-')) setCurrentStep('label-fraud');
    else if (currentStep.startsWith('tobacco-'))
      setCurrentStep('label-tobacco');
    else if (currentStep.startsWith('health-')) setCurrentStep('label-health');
    else if (currentStep.startsWith('gambling-'))
      setCurrentStep('label-gambling');
    else if (currentStep.startsWith('rgs-other-'))
      setCurrentStep('label-rgs-other');
    else if (currentStep.startsWith('privacy-'))
      setCurrentStep('label-privacy');
    else if (currentStep.startsWith('spam-')) setCurrentStep('label-spam');
    // Label main categories back to label
    else if (currentStep.startsWith('label-')) setCurrentStep('label');
    else if (currentStep === 'label') setCurrentStep('decision-tree');
    // Default fallback
    else setCurrentStep('decision-tree');
  };

  const currentStepData = steps[currentStep];
  if (!currentStepData) {
    return (
      <div className='max-w-3xl mx-auto'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='text-center py-12'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Step not found: {currentStep}
            </h3>
            <p className='text-gray-600 mb-4'>
              This step hasn't been implemented yet in the decision tree.
            </p>
            <button
              onClick={() => setCurrentStep('decision-tree')}
              className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Back to Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Decision Tree</h2>
            <p className='text-sm text-gray-600'>Job ID: {jobId}</p>
          </div>
          <button
            onClick={onNewSearch}
            className='px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2'
          >
            <ArrowLeft size={16} />
            New Search
          </button>
        </div>

        {decisionPath.length > 0 && (
          <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
            <p className='text-sm font-medium text-gray-700 mb-2'>
              Path chosen:
            </p>
            <p className='text-gray-800'>{decisionPath.join(' > ')}</p>
          </div>
        )}

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            {currentStepData.question}
          </h3>

          <div className='grid gap-3'>
            {currentStepData.options.map((option, index) => (
              <button
                key={`${option.id}-${index}`}
                onClick={() => handleDecisionSelect(option)}
                className='text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-gray-800 flex-1 pr-4'>
                    {option.label}
                  </span>
                  <span className='text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0'>
                    {option.value}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back button para navegação */}
        {currentStep !== 'decision-tree' && (
          <div className='mt-6 pt-4 border-t border-gray-200'>
            <button
              onClick={handleBackNavigation}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md flex items-center gap-2'
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
