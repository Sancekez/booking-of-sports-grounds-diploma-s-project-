import { useParams } from "react-router";
import { useGetQuizByIdMutation } from "../redux/api/userApi";

const ReviewQuizPage = () => {
   const { id } = useParams();
   const { data } = useGetQuizByIdMutation(id);

   return (
      <>
         <div>{data}</div>
      </>
   );
};

export default ReviewQuizPage;
