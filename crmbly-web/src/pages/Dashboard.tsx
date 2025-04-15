import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customerService";

export default function Dashboard() {
  const { data: customers = [] } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
  });

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    leads: customers.filter((c) => c.status === "lead").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{ flexWrap: "wrap" }}
      >
        <Box sx={{ minWidth: { xs: "100%", sm: "45%", md: "22%" } }}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Customers</Typography>
            <Typography variant="h3">{stats.total}</Typography>
          </Paper>
        </Box>
        <Box sx={{ minWidth: { xs: "100%", sm: "45%", md: "22%" } }}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "success.light",
              color: "success.contrastText",
            }}
          >
            <Typography variant="h6">Active</Typography>
            <Typography variant="h3">{stats.active}</Typography>
          </Paper>
        </Box>
        <Box sx={{ minWidth: { xs: "100%", sm: "45%", md: "22%" } }}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "warning.light",
              color: "warning.contrastText",
            }}
          >
            <Typography variant="h6">Leads</Typography>
            <Typography variant="h3">{stats.leads}</Typography>
          </Paper>
        </Box>
        <Box sx={{ minWidth: { xs: "100%", sm: "45%", md: "22%" } }}>
          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "error.light",
              color: "error.contrastText",
            }}
          >
            <Typography variant="h6">Inactive</Typography>
            <Typography variant="h3">{stats.inactive}</Typography>
          </Paper>
        </Box>
      </Stack>
    </div>
  );
}

