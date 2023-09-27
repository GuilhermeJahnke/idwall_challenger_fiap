export class CreateCriminalDto {
  name: string;
  forename: string;
  nationality: string;
  dateOfBirth: Date;
  photoUrl: string;
  sex: string;
  reward: number;
  collectedFrom: string;
  crimes: number[];
}
