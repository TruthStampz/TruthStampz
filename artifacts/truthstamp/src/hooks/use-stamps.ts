import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type StampFlag = 
  | "exif_present" 
  | "no_gan_artifacts" 
  | "natural_noise_pattern" 
  | "device_signature_match" 
  | "metadata_consistent" 
  | "gan_artifacts_detected"
  | "color_profile_altered";

export type Stamp = {
  id: string;
  filename: string;
  type: 'photo' | 'video' | 'article' | 'research';
  date: string;
  score: number;
  topicId: string;
  tokenId: string;
  txId: string;
  flags: StampFlag[];
  hash: string;
  creator: string;
  fileSize: string;
};

// MOCK DATA
const MOCK_STAMPS: Stamp[] = [
  {
    id: "st_10938a9b",
    filename: "DSC09123_original.jpg",
    type: "photo",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    score: 97,
    topicId: "0.0.4829183",
    tokenId: "0.0.5912847#1",
    txId: "0.0.847291@16893481.123",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    creator: "0.0.847291",
    flags: ["exif_present", "no_gan_artifacts", "natural_noise_pattern", "device_signature_match", "metadata_consistent"],
    fileSize: "4.2 MB"
  },
  {
    id: "st_29b8c7df",
    filename: "interview_raw_footage.mp4",
    type: "video",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    score: 92,
    topicId: "0.0.4829183",
    tokenId: "0.0.5912847#2",
    txId: "0.0.847291@16891234.456",
    hash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    creator: "0.0.847291",
    flags: ["no_gan_artifacts", "natural_noise_pattern", "metadata_consistent"],
    fileSize: "142.5 MB"
  },
  {
    id: "st_38c7d6ef",
    filename: "synthesized_promo_v2.mp4",
    type: "video",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    score: 45,
    topicId: "0.0.4829183",
    tokenId: "0.0.5912847#3",
    txId: "0.0.847291@16889412.789",
    hash: "f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2",
    creator: "0.0.847291",
    flags: ["gan_artifacts_detected", "color_profile_altered"],
    fileSize: "18.1 MB"
  },
  {
    id: "st_47d6e5fa",
    filename: "investigative_report_final.pdf",
    type: "article",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    score: 87,
    topicId: "0.0.4829183",
    tokenId: "0.0.5912847#4",
    txId: "0.0.847291@16881122.111",
    hash: "a4a8c9b3e1d2f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    creator: "0.0.847291",
    flags: ["metadata_consistent"],
    fileSize: "1.2 MB"
  },
  {
    id: "st_56e5f4ab",
    filename: "edited_headshot.jpg",
    type: "photo",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    score: 65,
    topicId: "0.0.4829183",
    tokenId: "0.0.5912847#5",
    txId: "0.0.847291@16875544.222",
    hash: "b5b9d0c4f2e3a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    creator: "0.0.847291",
    flags: ["exif_present", "color_profile_altered", "natural_noise_pattern"],
    fileSize: "3.4 MB"
  },
];

// Memory store for demo
let stampsStore = [...MOCK_STAMPS];

export function useStamps() {
  return useQuery({
    queryKey: ['stamps'],
    queryFn: async () => {
      // simulate network delay
      await new Promise(r => setTimeout(r, 600));
      return [...stampsStore].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  });
}

export function useStamp(id: string) {
  return useQuery({
    queryKey: ['stamps', id],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 400));
      const stamp = stampsStore.find(s => s.id === id);
      if (!stamp) throw new Error("Stamp not found");
      return stamp;
    }
  });
}

export function useVerifyHash() {
  return useMutation({
    mutationFn: async (hash: string) => {
      await new Promise(r => setTimeout(r, 1500));
      // Try to find a match in our store, otherwise return a fake result
      const match = stampsStore.find(s => s.hash === hash);
      if (match) return match;
      
      // If no exact match, simulate a new one if it's a valid looking hash
      if (hash.length > 10) {
        return {
          id: "st_verified_" + Math.floor(Math.random() * 10000),
          filename: "verified_file.bin",
          type: "research" as const,
          date: new Date().toISOString(),
          score: 88,
          topicId: "0.0.4829183",
          tokenId: `0.0.5912847#${Math.floor(Math.random() * 1000)}`,
          txId: `0.0.847291@${Date.now()}.000`,
          hash: hash,
          creator: "0.0.847291",
          flags: ["metadata_consistent", "no_gan_artifacts"] as StampFlag[],
          fileSize: "Unknown"
        };
      }
      throw new Error("Could not verify hash on Hedera network");
    }
  });
}

export function useCreateStamp() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (file: File) => {
      // Simulate complex AI + blockchain process
      // We don't actually wait here, the UI handles the step-by-step illusion
      // Just return the created object
      
      const newStamp: Stamp = {
        id: `st_${Math.random().toString(16).slice(2, 10)}`,
        filename: file.name,
        type: file.type.startsWith('image') ? 'photo' : file.type.startsWith('video') ? 'video' : 'article',
        date: new Date().toISOString(),
        score: Math.floor(Math.random() * 20) + 75, // mostly good scores
        topicId: "0.0.4829183",
        tokenId: `0.0.5912847#${stampsStore.length + 1}`,
        txId: `0.0.847291@${Date.now()}.123`,
        hash: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
        creator: "0.0.847291",
        flags: ["exif_present", "no_gan_artifacts", "natural_noise_pattern", "metadata_consistent"],
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB"
      };
      
      stampsStore = [newStamp, ...stampsStore];
      return newStamp;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stamps'] });
    }
  });
}
