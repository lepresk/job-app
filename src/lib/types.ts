export interface Skill {
  id: string;
  name: string;
  isValidated: boolean;
  score?: number;
  validatedAt?: Date;
  yearsOfExperience?: number;
}

// Rest of the types remain the same...