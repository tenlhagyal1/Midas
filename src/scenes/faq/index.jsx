import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Midas" subtitle="Join Midas Today and Experience the Magic of the Golden Touch!" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          🌟 Discover the Golden Touch of Investing 🌟
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Welcome to Midas, the future of stock exchange apps. Dive into a world where every swipe, every click, and every decision brings you closer to your financial dreams.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          📈 Features That Shine
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            • Golden Insights: Harness the power of AI-driven analytics to spot the next big opportunity.<br />
            • Instant Trades: With lightning-fast execution, seize the moment and make your move.<br />
            • Secure Vault: Your investments are safe in our fortified digital vault, guarded 24/7.<br />
            • Learning Academy: New to investing? Our Midas Academy guides you from novice to pro.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          💡 Why Choose Midas?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            • User-Friendly Interface: Sleek, intuitive, and designed for both beginners and seasoned traders.<br />
            • Global Reach: Access markets from around the world, all in one app.<br />
            • Real-time Updates: Stay ahead with live market data and real-time notifications.<br />
            • Community Power: Join our thriving community of investors, share insights, and grow together.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          🎁 Special Offer!
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Sign up now and get $50 worth of free trading credits. Limited time offer!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          📞 Need Assistance?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Our golden support team is available around the clock. Reach out anytime!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
