export interface BirthdayWishRequest {
  name: string;
  relationship: string;
  traits: string;
  memories: string;
}

export interface Photo {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}

export enum Section {
  HERO = 'hero',
  GALLERY = 'gallery',
  AI_WISH = 'ai_wish',
  SURPRISE = 'surprise'
}