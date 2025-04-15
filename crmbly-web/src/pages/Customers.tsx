import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { customerService } from "../services/customerService";
import { Customer } from "../types/customer";

export default function Customers() {
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
  });

  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    await customerService.deleteCustomer(id);
    queryClient.invalidateQueries({ queryKey: ["customers"] });
  };

  const getStatusChipColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      case "lead":
        return "warning";
      default:
        return "default";
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add Customer
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.status}
                    color={getStatusChipColor(customer.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {customer.lastContact?.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

