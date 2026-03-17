import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-display font-bold mb-4">404 - Not Found</h1>
          <p className="text-muted-foreground mb-8 text-lg">The page or certificate you are looking for does not exist.</p>
          <Link href="/" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold inline-block hover:bg-primary/90 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
