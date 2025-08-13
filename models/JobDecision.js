import mongoose from 'mongoose';

const JobDecisionSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'conflict', 'aligned'],
      default: 'pending',
      index: true,
    },
    decisions: [
      {
        analyst: String,
        decision: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    finalDecision: String,
    qsaNotes: String,
  },
  {
    timestamps: true,
  }
);

// Index composto para busca rápida
JobDecisionSchema.index({ jobId: 1, status: 1 });

export default mongoose.models.JobDecision ||
  mongoose.model('JobDecision', JobDecisionSchema);
