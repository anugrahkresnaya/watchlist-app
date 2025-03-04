import { DialogTitle } from '@radix-ui/react-dialog';
import { TrailerModalProps } from '@/types/props';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';

const TrailerModal: React.FC<TrailerModalProps> = ({ trailerKey }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="px-4 py-2">🎥 Watch Trailer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogTitle>Watch Trailer</DialogTitle>
        {trailerKey ? (
          <iframe
            className="w-full h-[500] rounded-lg"
            src={`https://www.youtube.com/embed/${trailerKey}`}
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
