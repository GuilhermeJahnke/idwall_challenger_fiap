class Terrorist {
  constructor() {
    this.validCrimes = {
      lavagem: 'Laundering',
      terrorism: 'Terrorism',
    };
  }

  fromFbiDetailJson(terroristDetail) {
    let fullName = terroristDetail.title;
    let dateOfBirth = terroristDetail.dates_of_birth_used?.toString();
    let nationalities = terroristDetail.nationality?.toString();
    let entityId = terroristDetail.uid;
    let sex = terroristDetail.sex;
    let arrestWarrants = terroristDetail.caution;
    let photoUrl = terroristDetail.images?.[0]?.thumb;
    let crimes = terroristDetail.sentence;
    let collectedFrom = 'FBI';

    let terroristModel = {
      fullName,
      dateOfBirth,
      nationalities,
      entityId,
      sex,
      arrestWarrants,
      photoUrl,
      crimes,
      collectedFrom,
    };

    return terroristModel;
  }

  fromInterpolDetailJson(terroristDetail) {
    let fullName = terroristDetail.name + ' ' + terroristDetail.forename;
    let dateOfBirth = terroristDetail.date_of_birth?.toString();
    let nationalities = terroristDetail.nationalities?.toString();
    let entityId = terroristDetail.entity_id;
    let sex = terroristDetail.sex_id;
    let arrestWarrants = terroristDetail.arrest_warrants[0].charge;
    let photoUrl = terroristDetail?._links?.thumbnail?.href;
    let crimes = terroristDetail.sentence;
    let collectedFrom = 'Interpol';

    return {
      fullName,
      dateOfBirth,
      nationalities,
      entityId,
      sex,
      arrestWarrants,
      photoUrl,
      crimes,
      collectedFrom,
    };
  }
}

export default Terrorist;
