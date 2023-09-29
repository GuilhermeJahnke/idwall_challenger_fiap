class Terrorist {
  constructor(
    fullName,
    dateOfBirth,
    nationalities,
    entityId,
    gender,
    arrestWarrants,
    photoUrl,
    crimes,
    collectedFrom,
  ) {
    this.fullName = fullName;
    this.dateOfBirth = dateOfBirth;
    this.nationalities = nationalities;
    this.entityId = entityId;
    this.gender = gender;
    this.arrestWarrants = arrestWarrants;
    this.photoUrl = photoUrl;
    this.crimes = crimes;
    this.collectedFrom = collectedFrom;
  }

  fromFbiDetailJson(terroristDetail) {
    let fullName = terroristDetail.title;
    let dateOfBirth = terroristDetail.dates_of_birth_used?.toString();
    let nationalities = terroristDetail.nationality?.toString();
    let entityId = terroristDetail.uid;
    let gender = terroristDetail.sex;
    let arrestWarrants = terroristDetail.caution;
    let photoUrl = terroristDetail.images[0]?.thumb;
    let crimes = [];
    let collectedFrom = "FBI";

    let terroristModel = new Terrorist(
      fullName,
      dateOfBirth,
      nationalities,
      entityId,
      gender,
      arrestWarrants,
      photoUrl,
      crimes,
      collectedFrom,
    );

    return terroristModel;
  }

  fromInterpolDetailJson(terroristDetail) {
    let fullName = terroristDetail.name + ' ' + terroristDetail.forename;
    let dateOfBirth = terroristDetail.date_of_birth?.toString();
    let nationalities = terroristDetail.nationalities?.toString();
    let entityId = terroristDetail.entity_id;
    let gender = terroristDetail.sex_id;
    let arrestWarrants = terroristDetail.arrest_warrants[0].charge;
    let collectedFrom = "Interpol";

    let terroristModel = new Terrorist(
      fullName,
      dateOfBirth,
      nationalities,
      entityId,
      gender,
      arrestWarrants,
      collectedFrom,
    );

    return terroristModel;
  }
}

export default Terrorist;
