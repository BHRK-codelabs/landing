export type NarrativeBeat = {
  title: string;
  description: string;
};

export type NarrativeSection = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  beats: NarrativeBeat[];
};

export type StackedParallaxSectionsProps = {
  sections: NarrativeSection[];
};
