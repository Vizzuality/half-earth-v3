import React from 'react';
import { ReactComponent as AreaIcon } from 'assets/area.svg'; 

const LocalPriorityCardComponent = (props) => {
  return (
    <>
      <section>
        <h3>The current protection</h3>
      </section>
      <section>
        <div>
          <AreaIcon />
          <div>
            some text
          </div>
        </div>
        <div>
          <AreaIcon />
          <div>
            some other text
          </div>
        </div>
      </section>
    </>
  )
}

export default LocalPriorityCardComponent;