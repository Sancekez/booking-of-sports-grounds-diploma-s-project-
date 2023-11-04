import { useParams } from "react-router";
import { useGetQuizByIdQuery } from "../redux/api/userApi";

const ReviewQuizPage = () => {
   const { id } = useParams();
   const { data } = useGetQuizByIdQuery(id);

   return (
      <>
         <div>{data}</div>
      </>
   );
};

export default ReviewQuizPage;
