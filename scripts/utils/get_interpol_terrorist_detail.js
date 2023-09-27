import InterpolDetailScrap from "../entities/interpol_detail_scrap";
import Terrorist from "../entities/terrorist";

const interpolDetailScrap = new InterpolDetailScrap();
const terroristModel = new Terrorist();

export async function _getTerroristDetail(financeTerrorism){
    let terrorists = [];
    
    for (const terrorist of financeTerrorism) {
      try {
        let entityIdFormatted = terrorist.entity_id.replace("/", "-");
  
        const terroristDetail = await interpolDetailScrap.getDetail(entityIdFormatted)
        
        const terroristModelImpl = await terroristModel.fromInterpolDetailJson(terroristDetail);
  
        terrorists.push(terroristModelImpl);
  
      } catch (error) {
        console.error('Erro ao buscar detalhe do terrorista:', error);
      }
    }
  
    return terrorists;
  }
  