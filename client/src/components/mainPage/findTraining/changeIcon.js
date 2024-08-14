import SportsMmaIcon from "@mui/icons-material/SportsMma";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export const ChangeIcon = (sport) => {
    switch (sport) {
      case "Swimming":
        return <PoolIcon />;
      case "Running":
        return <DirectionsRunIcon />;
      case "Power-Lifting":
        return <FitnessCenterIcon />;
      case "Fitness":
        return <SportsGymnasticsIcon />;
      case "Boxing":
        return <SportsMmaIcon />;
      case "Cross-Fit":
        return <EmojiEventsIcon />;
      default:
        return null;
    }
  };