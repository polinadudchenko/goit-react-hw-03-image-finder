import Spinner from "react-loader-spinner";
import { StyledLoader } from "./Loader.styled";

export default function Loader() {
    return <StyledLoader><Spinner
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={3000} //3 secs
    />
    </StyledLoader>
}