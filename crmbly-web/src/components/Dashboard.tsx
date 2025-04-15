import { Box, Typography, Paper, Stack } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { month: "Jan", customers: 4 },
  { month: "Feb", customers: 6 },
  { month: "Mar", customers: 8 },
  { month: "Apr", customers: 12 },
];

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Stack spacing={3}>
        <Box sx={{ maxWidth: 600 }}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              New Customers per Month
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}

