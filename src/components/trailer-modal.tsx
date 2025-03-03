import { DialogTitle } from '@radix-ui/react-dialog';
import useVideos from '@/hooks/useVideos';
import { TrailerModalProps } from '@/types/props';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';

const TrailerModal: React.FC<TrailerModalProps> = ({ id, type }) => {
  const { video, loading } = useVideos(id.toString(), type);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="px-4 py-2">🎥 Watch Trailer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogTitle>Watch Trailer</DialogTitle>
        {loading ? (
          <p>Loading...</p>
        ) : video ? (
          <iframe
            className="w-full h-[500] rounded-lg"
            src={video}
            allowFullScreen
          />
        ) : (
          <p>No trailer available</p>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default TrailerModal;
