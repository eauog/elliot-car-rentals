import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ImageModal({ imageUrl }: { imageUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <img src={imageUrl} alt="Vehicle" className="w-16 h-10 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <img src={imageUrl} alt="Vehicle" className="max-w-full h-auto" />
      </DialogContent>
    </Dialog>
  );
}
