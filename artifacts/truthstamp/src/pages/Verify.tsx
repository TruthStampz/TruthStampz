import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useVerifyHash } from "@/hooks/use-stamps";
import { Search, Hash, UploadCloud, ShieldAlert, CheckCircle } from "lucide-react";
import { ScoreBadge } from "@/components/ScoreBadge";
import { cn } from "@/lib/utils";

export default function Verify() {
  const [mode, setMode] = useState<'hash' | 'upload'>('hash');
  const [hashInput, setHashInput] = useState("");
  const verifyMutation = useVerifyHash();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hashInput.trim()) return;
    verifyMutation.mutate(hashInput.trim());
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
            <Search className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Public Verification Portal</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Anyone can verify a TruthStamp. No account required. 
            Upload a file or paste its SHA-256 hash to view its immutable provenance.
          </p>
        </div>

        <div className="bg-card rounded-3xl border border-white/10 overflow-hidden shadow-xl mb-12">
          <div className="flex border-b border-white/10">
            <button 
              onClick={() => setMode('hash')}
              className={cn(
                "flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors relative",
                mode === 'hash' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Hash className="w-4 h-4" /> Paste Hash
              {mode === 'hash' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
            <button 
              onClick={() => setMode('upload')}
              className={cn(
                "flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors relative",
                mode === 'upload' ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <UploadCloud className="w-4 h-4" /> Upload File
              {mode === 'upload' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          </div>

          <div className="p-8">
            {mode === 'hash' ? (
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    SHA-256 Asset Hash
                  </label>
                  <input 
                    type="text" 
                    value={hashInput}
                    onChange={(e) => setHashInput(e.target.value)}
                    placeholder="e.g. e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 font-mono text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={verifyMutation.isPending || !hashInput.trim()}
                  className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {verifyMutation.isPending ? "Searching Ledger..." : "Verify on Hedera"}
                </button>
              </form>
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-white/30 transition-colors cursor-pointer">
                <UploadCloud className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-1">Select a file to verify</h3>
                <p className="text-sm text-muted-foreground">We will hash it locally. The file won't be stored.</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Area */}
        {verifyMutation.isSuccess && verifyMutation.data && (
          <div className="bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Verified Match Found</h2>
                <p className="text-muted-foreground mt-1">This asset has a valid TruthStamp on the Hedera network.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">AI Trust Score</p>
                <ScoreBadge score={verifyMutation.data.score} size="lg" />
              </div>
              <div className="p-4 bg-background/50 rounded-xl border border-white/5">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Creator Wallet</p>
                <p className="font-mono text-lg">{verifyMutation.data.creator}</p>
              </div>
            </div>

            <Link 
              href={`/certificate/${verifyMutation.data.id}`}
              className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all flex items-center justify-center"
            >
              View Full Certificate Details
            </Link>
          </div>
        )}

        {verifyMutation.isError && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 text-center">
            <ShieldAlert className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Record Not Found</h2>
            <p className="text-muted-foreground">
              No matching TruthStamp was found for this hash on the Hedera network. 
              The asset may be altered or was never stamped.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
