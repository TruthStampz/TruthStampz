import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { useStamps } from "@/hooks/use-stamps";
import { ScoreBadge } from "@/components/ScoreBadge";
import { formatDate, truncateAddress } from "@/lib/utils";
import { FileImage, FileVideo, FileText, File, ArrowRight, Activity, Zap, Wallet } from "lucide-react";

export default function Dashboard() {
  const { data: stamps, isLoading } = useStamps();

  const getIcon = (type: string) => {
    switch(type) {
      case 'photo': return <FileImage className="w-5 h-5" />;
      case 'video': return <FileVideo className="w-5 h-5" />;
      case 'article': return <FileText className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const avgScore = stamps?.length 
    ? Math.round(stamps.reduce((acc, s) => acc + s.score, 0) / stamps.length) 
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Creator Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and track your notarized assets.</p>
          </div>
          <Link 
            href="/stamp" 
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all glow-primary inline-flex items-center justify-center gap-2"
          >
            Stamp New Content
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-16 h-16 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Stamps</p>
            <p className="text-4xl font-display font-bold text-foreground">{isLoading ? "-" : stamps?.length}</p>
          </div>
          <div className="bg-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-16 h-16 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Trust Score</p>
            <div className="flex items-center gap-3">
              <p className="text-4xl font-display font-bold text-foreground">{isLoading ? "-" : avgScore}</p>
              {!isLoading && <ScoreBadge score={avgScore} size="sm" showIcon={false} />}
            </div>
          </div>
          <div className="bg-card border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wallet className="w-16 h-16 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">HBAR Balance</p>
            <p className="text-4xl font-display font-bold text-foreground">1,450<span className="text-xl text-muted-foreground">.23 ℏ</span></p>
          </div>
        </div>

        {/* List */}
        <h2 className="text-xl font-display font-bold mb-4">Recent Stamps</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 bg-card/50 rounded-2xl border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : stamps?.length === 0 ? (
          <div className="text-center py-20 bg-card/30 rounded-2xl border border-white/5 border-dashed">
            <File className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground">No stamps yet</h3>
            <p className="text-muted-foreground mt-1 mb-6">Upload your first piece of content to notarize it.</p>
            <Link href="/stamp" className="text-primary hover:underline">Start Stamping</Link>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-sm text-muted-foreground bg-white/5">
                    <th className="p-4 font-medium">Asset</th>
                    <th className="p-4 font-medium hidden sm:table-cell">Date</th>
                    <th className="p-4 font-medium hidden md:table-cell">Tx ID</th>
                    <th className="p-4 font-medium">AI Score</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stamps?.map((stamp) => (
                    <tr key={stamp.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary border border-white/5 group-hover:border-primary/30 transition-colors">
                            {getIcon(stamp.type)}
                          </div>
                          <div>
                            <p className="font-medium text-foreground max-w-[150px] sm:max-w-xs truncate">{stamp.filename}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stamp.type} • {stamp.fileSize}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell text-sm text-muted-foreground">
                        {formatDate(stamp.date)}
                      </td>
                      <td className="p-4 hidden md:table-cell text-sm font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                          {truncateAddress(stamp.txId)}
                        </div>
                      </td>
                      <td className="p-4">
                        <ScoreBadge score={stamp.score} size="sm" />
                      </td>
                      <td className="p-4 text-right">
                        <Link 
                          href={`/certificate/${stamp.id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
