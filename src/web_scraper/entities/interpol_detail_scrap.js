class InterpolDetailScrap {
  constructor() {
    this.baseUrl = 'https://ws-public.interpol.int/notices/v1/red/';
  }

  async getDetail(entity_id) {
    const response = await fetch(this.baseUrl + entity_id);

    const responseData = await response.json();
    return responseData;
  }
}

export default InterpolDetailScrap;
