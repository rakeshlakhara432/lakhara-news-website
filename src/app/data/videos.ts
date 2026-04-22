export interface SamajVideo {
  id: number;
  title: string;
  subtitle: string;
  url: string;
  description: string;
}

export const SAMAJ_VIDEOS: SamajVideo[] = [
  {
    id: 1,
    title: "AI Video Creation for Lakhara Samaj",
    subtitle: "लखारा समाज के लिए AI आधारित वीडियो निर्माण",
    url: "/videos/AI_Video_Creation_for_Lakhara_Samaj.mp4",
    description: "समाज के गौरवशाली इतिहास और भविष्य की योजनाओं को दर्शाता एक विशेष AI वीडियो।"
  },
  {
    id: 2,
    title: "Hindi Video for Samaj News Website",
    subtitle: "समाज न्यूज़ वेबसाइट के लिए विशेष प्रस्तुति",
    url: "/videos/Hindi_Video_for_Samaj_News_Website.mp4",
    description: "हमारी नई न्यूज़ वेबसाइट का परिचय और समाज के लिए इसके लाभों की जानकारी।"
  }
];
