import InterpolDetailScrap from '../entities/interpol_detail_scrap.js';
import Terrorist from '../entities/terrorist.js';

const interpolDetailScrap = new InterpolDetailScrap();
const terroristModel = new Terrorist();

export default async function getTerroristDetail(financeTerrorism) {
  let terrorists = [];

  for (const terrorist of financeTerrorism) {
    try {
      let entityIdFormatted = terrorist.entity_id.replace('/', '-');

      const terroristDetail = await interpolDetailScrap.getDetail(
        entityIdFormatted,
      );

      const terroristModelImpl =
        terroristModel.fromInterpolDetailJson(terroristDetail);

      terrorists.push(terroristModelImpl);
    } catch (error) {
      console.error('Erro ao buscar detalhe do terrorista:', error);
    }
  }

  return terrorists;
}
