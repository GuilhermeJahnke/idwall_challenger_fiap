class Terrorist{
    constructor(
      name, 
      dateOfBirth, 
      nationalities, 
      entityId, 
      gender,
      arrestWarrants,
    ){
      this.name = name;
      this.dateOfBirth = dateOfBirth;
      this.nationalities = nationalities;
      this.entityId = entityId;
      this.gender = gender;
      this.arrestWarrants = arrestWarrants
    }
  
    async fromFbiDetailJson(terroristDetail){
        let name = terroristDetail.title;
        let dateOfBirth = terroristDetail.dates_of_birth_used;
        let nationalities = terroristDetail.nationality;
        let entityId = null;
        let gender = terroristDetail.sex;
        let charge = terroristDetail.caution;

        let terroristModel = new Terrorist(
            name,
            dateOfBirth,
            nationalities,
            entityId,
            gender,
            charge,
        );

        return terroristModel;
    }
  
    async fromInterpolDetailJson(terroristDetail){
      let name = terroristDetail.name + " " + terroristDetail.forename;
      let dateOfBirth = terroristDetail.date_of_birth;
      let nationalities = terroristDetail.nationalities;
      let entityId = terroristDetail.entity_id;
      let gender = terroristDetail.sex_id;
      let charge = terroristDetail.arrest_warrants[0].charge;
  
      let terroristModel = new Terrorist(
        name,
        dateOfBirth,
        nationalities,
        entityId,
        gender,
        charge,
      );
  
      return terroristModel;
    }
}

export default Terrorist;
