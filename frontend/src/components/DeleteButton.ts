import axios from "axios";
import { Button } from "@/interfaces/Button";

export default class DeleteButton implements Button {
  label: string;
  onClick: () => void;
  fileID: string;

  constructor(label: string, fileID: string) {
    this.label = label;
    this.fileID = fileID;
    this.onClick = () => {
      this.deleteFile();
    };
  }

  async deleteFile(): Promise<boolean> {
    try {
      const response = await axios.delete(`/delete/${this.fileID}`);
      return response.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
