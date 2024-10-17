export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Character = {
    id: string;
    attributes: Attributes;
    skills: Record<string, number>; // Stores <skill, points spent on each>
}