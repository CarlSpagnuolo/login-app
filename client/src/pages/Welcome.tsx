import CyberBackground from "../components/CyberBackground";
import EnterButton from "../components/EnterButton";

function Welcome() {
  return (
    <CyberBackground>
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        <EnterButton />
      </div>
    </CyberBackground>
  );
}

export default Welcome;
