import useData from "./useData.ts";

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const useCategory = () => useData<Category>("category");

export default useCategory;
