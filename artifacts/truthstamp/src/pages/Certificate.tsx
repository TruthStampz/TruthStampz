import { useParams } from "wouter";
import { Layout } from "@/components/Layout";
import { useStamp } from "@/hooks/use-stamps";
import { ScoreBadge } from "@/components/ScoreBadge";
import { cn, formatDate } from "@/lib/utils";
import { Copy, ExternalLink, Download, ShieldCheck, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Certificate() {
  const { id } = useParams<{ id: string }>();
  const { data: stamp, isLoading, isError } = useStamp(id || "");
  const { toast } = useToast();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (isError || !stamp) {
    return (
      <Layout>
        <div className="text-center py-32">
          <h2 className="text-2xl font-bold mb-2">Certificate Not Found</h2>
          <p className="text-muted-foreground">This TruthStamp ID does not exist.</p>
        </div>
      </Layout>
    );
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const getFlagLabel = (flag: string) => {
    return flag.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Actions Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span>Official TruthStamp Record</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => copyToClipboard(window.location.href, "Link")}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Copy className="w-4 h-4" /> Copy Link
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> PDF Report
            </button>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Decorative Seal bg */}
          <img 
            src={`${import.meta.env.BASE_URL}images/seal.png`} 
            alt="" 
            className="absolute -right-20 -top-20 w-96 h-96 opacity-5 pointer-events-none mix-blend-screen"
          />

          <div className="p-8 md:p-12 border-b border-white/5 relative z-10">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div>
                <h1 className="text-3xl font-display font-bold mb-2 break-all">{stamp.filename}</h1>
                <p className="text-muted-foreground mb-6">Stamped by <span className="font-mono text-foreground">{stamp.creator}</span> on {formatDate(stamp.date)}</p>
                <div className="inline-block p-4 rounded-xl bg-background border border-white/5">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">AI Trust Analysis</p>
                  <ScoreBadge score={stamp.score} size="lg" />
                </div>
              </div>
              
              <div className="shrink-0 flex flex-col gap-3 min-w-[200px]">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-center">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Content Type</p>
                  <p className="font-medium capitalize">{stamp.type}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-center">
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">File Size</p>
                  <p className="font-medium">{stamp.fileSize}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 relative z-10">
            {/* AI Flags */}
            <div className="p-8 md:p-12">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> 
                Analysis Indicators
              </h3>
              <div className="space-y-3">
                {stamp.flags.map(flag => {
                  const isNegative = flag.includes('detected') || flag.includes('altered');
                  return (
                    <div key={flag} className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border",
                      isNegative ? "bg-destructive/5 border-destructive/20" : "bg-emerald-500/5 border-emerald-500/20"
                    )}>
                      {isNegative ? (
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      <span className="text-sm font-medium">{getFlagLabel(flag)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Blockchain Data */}
            <div className="p-8 md:p-12 bg-black/20">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> 
                Hedera Ledger Proof
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-muted-foreground">SHA-256 Hash</p>
                    <button onClick={() => copyToClipboard(stamp.hash, "Hash")} className="text-xs text-primary hover:underline">Copy</button>
                  </div>
                  <p className="font-mono text-sm p-3 rounded-lg bg-background border border-white/5 break-all text-foreground/80">
                    {stamp.hash}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Transaction ID</p>
                  <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-background border border-white/5 group hover:border-primary/30 transition-colors">
                    <span className="font-mono text-sm text-foreground/80 group-hover:text-primary transition-colors">{stamp.txId}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">HCS Topic ID</p>
                    <p className="font-mono text-sm p-3 rounded-lg bg-background border border-white/5 text-foreground/80">
                      {stamp.topicId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">NFT Token ID</p>
                    <p className="font-mono text-sm p-3 rounded-lg bg-background border border-white/5 text-foreground/80">
                      {stamp.tokenId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
