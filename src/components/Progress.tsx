import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type Color = "red" | "blue";

interface MyComponentProps {
  progressColor: Color;
}
export default function CircularIndeterminate(props: MyComponentProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress
        sx={
          props.progressColor === "red"
            ? { color: "#FF1654" }
            : { color: "#00BA9F" }
        }
      />
    </Box>
  );
}
