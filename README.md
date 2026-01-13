LUMEN.MIND

PyTorch-based fine-tuning trainer for LUMEN, an evolving AI personality designed to be unpredictable, self-shaping, and non-conventional.

This repository implements efficient LoRA fine-tuning on the Qwen/Qwen2.5-7B base model using 8-bit quantization, gradient checkpointing, and mixed precision training.

Features:

- Personality infusion through custom prompt template
- Synthetic dataset generation from core description
- Memory-efficient training with PEFT and Accelerate
- Inference script for interactive chat with the trained model
- Evaluation metrics including perplexity

Setup Instructions:

1. Install dependencies
   pip install -r requirements.txt

2. Generate the personality dataset
   python data/prepare_dataset.py

3. Train the model
   python train.py
   (Training time depends on hardware; expect several hours on consumer GPU)

4. Run inference
   python inference.py
   Type 'exit' to quit the chat session.

The trained LoRA adapter will be saved in the models/lumen_trained directory.

License
MIT License - see LICENSE file for details.
