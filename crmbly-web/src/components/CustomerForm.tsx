import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

export default function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (id) {
      // Mock fetch customer data
      // In a real app, this would be an API call
      const mockCustomer = {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
      };
      setFormData(mockCustomer);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the customer
    console.log("Saving customer:", formData);
    navigate("/customers");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Customer" : "Add Customer"}
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                {id ? "Update" : "Create"}
              </Button>
              <Button variant="outlined" onClick={() => navigate("/customers")}>
                Cancel
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

