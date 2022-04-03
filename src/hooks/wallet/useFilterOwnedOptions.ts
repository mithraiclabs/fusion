import { useRecoilValue } from "recoil"
import { selectAllOptionMarkets } from "../../recoil"


export const useFilterOwnedOptions = () => {
  const psyAmericanOptions = useRecoilValue(selectAllOptionMarkets);
  
}
