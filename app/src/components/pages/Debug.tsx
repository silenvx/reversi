import { HandContainer } from "@/components/features/hand/HandContainer";
import { Disc } from "@/domains/reversi/const";

export function Debug() {
  return (
    <div className="flex justify-between">
      <HandContainer player={Disc.black} />
      <HandContainer player={Disc.black} />
      <HandContainer player={Disc.black} />
      <HandContainer player={Disc.black} />
    </div>
  );
}
