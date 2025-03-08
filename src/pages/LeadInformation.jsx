/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import LabelWithValue from "../components/common/LableWithValue";
import { Card } from "../components/common/Card";
import { CardTitle } from "../components/common/CardTitle";

const LeadInformation = () => {
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getLeadData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users-data/`);
      console.log("res:::::", res);

      setLeadData(res?.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getLeadData();
  }, []);

  console.log("leadData:::::", leadData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <button
            onClick={() => navigate(`/lead/${row.original.email}`)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            <IconEye size={20} />
          </button>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: leadData,
  });

  return (
    <>
      <MantineReactTable table={table} />
    </>
  );
};

export default LeadInformation;
