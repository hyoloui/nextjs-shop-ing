import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "@/redux/slice/filterSlice";

const ProductList = () => {
  const [sort, setSort] = useState("latest"); // 최신순, 인기순, 낮은가격순, 높은가격순

  const filteredProducts = useSelector(selectFilteredProducts); // 필터링된 상품들

  const dispatch = useDispatch();

  // 상품 정렬
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ product: filteredProducts, sort }));
  }, [dispatch, filteredProducts, sort]);

  const [currentPage, setCurrentPage] = useState(1); // 페이지 번호
  const [productsPerPage, setProductsPerPage] = useState(10); // 한 페이지에 보여줄 상품 수

  const indexOfLastProduct = currentPage * productsPerPage; // 1 * 10 = 10
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 10 - 10 = 0

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ); // 0, 10

  const isRadioSelected = (value) => sort === value;
  const handleRadioClick = (e) => setSort(e.target.value);

  return <div>ProductList</div>;
};

export default ProductList;
