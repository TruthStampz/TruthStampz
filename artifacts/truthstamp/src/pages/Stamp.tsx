import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { useCreateStamp } from "@/hooks/use-stamps";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { UploadCloud, File as FileIcon, X, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Uploading & Encrypting...",
  "Generating SHA-256 Signature...",
  "Running AI Forensic Analysis...",
  "Anchoring to Hedera Consensus...",
  "Minting TruthStamp NFT..."
];

export default function Stamp() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [, setLocation] = useLocation();
  
  const createStamp = useCreateStamp();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.webm'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    }
  });

  const handleStamp = async () => {
    if (!file) return;
    setAnalyzing(true);
    setStepIndex(0);

    // Simulate the process steps for dramatic effect
    for (let i = 0; i < STEPS.length; i++) {
      setStepIndex(i);
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    }

    try {
      const result = await createStamp.mutateAsync(file);
      setLocation(`/certificate/${result.id}`);
    } catch (error) {
      console.error(error);
      setAnalyzing(false);
      setStepIndex(-1);
      // In a real app, show a toast here
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold mb-4">Stamp Your Content</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your file to generate an immutable, AI-verified proof of authenticity on the Hedera network.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!analyzing ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-3xl border border-white/10 p-8 shadow-xl shadow-black/50"
            >
              {!file ? (
                <div 
                  {...getRootProps()} 
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300",
                    isDragActive ? "border-primary bg-primary/5" : "border-white/10 hover:border-primary/50 hover:bg-white/[0.02]"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className={cn("w-8 h-8 transition-colors", isDragActive ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Drag & Drop your file here</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Supports JPG, PNG, MP4, PDF (Max 500MB)
                  </p>
                  <button className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
                    Browse Files
                  </button>
                </div>
              ) : (
                <div className="border border-white/10 rounded-2xl p-6 bg-background/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                        <FileIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg truncate max-w-[200px] sm:max-w-xs">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type || 'Unknown type'}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFile(null)}
                      className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button 
                      onClick={handleStamp}
                      className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all glow-primary"
                    >
                      Begin Stamping <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl border border-primary/30 p-10 shadow-2xl shadow-primary/10 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-pattern-primary opacity-20" />
              
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-8" />
                
                <h3 className="text-2xl font-display font-bold mb-8">Processing Asset</h3>
                
                <div className="max-w-md mx-auto space-y-4 text-left">
                  {STEPS.map((step, i) => {
                    const isPast = i < stepIndex;
                    const isCurrent = i === stepIndex;
                    
                    return (
                      <div key={step} className="flex items-center gap-4">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500",
                          isPast ? "bg-primary text-primary-foreground" : 
                          isCurrent ? "bg-primary/20 text-primary border border-primary" : 
                          "bg-white/5 text-muted-foreground border border-white/10"
                        )}>
                          {isPast ? <CheckCircle2 className="w-4 h-4" /> : 
                           isCurrent ? <Loader2 className="w-3 h-3 animate-spin" /> : 
                           <span className="text-xs">{i + 1}</span>}
                        </div>
                        <span className={cn(
                          "font-medium transition-colors duration-500",
                          isPast ? "text-foreground" : 
                          isCurrent ? "text-primary animate-pulse" : 
                          "text-muted-foreground"
                        )}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
