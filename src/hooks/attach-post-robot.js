import { useEffect } from 'react';
import { attachPostRobotListeners } from 'utils/post-robot';

export const usePostRobot = (shouldAttachPostRobot, actions) => {
  useEffect(() => {
    if(shouldAttachPostRobot) {
      import('post-robot').then(postRobot => {
        attachPostRobotListeners(postRobot, actions)
      })
    }
  }, [shouldAttachPostRobot]);
}