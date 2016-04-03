import React from 'react';
import {
  Overlay,
  Panel,
  PanelHeader,
  PanelFooter,
  Button,
  Text,
  //Close,
  Space
} from 'rebass';

function SuccessModal (props) {

    return (
    <Overlay
      open={props.open}
    >
      <Panel theme="success">
        <PanelHeader>
          Awesome!
          <Space auto />
        </PanelHeader>
        <img
          src='https://media.giphy.com/media/l0O9zaOhXU3TlL0yc/giphy.gif'
          style={{
              maxWidth: '100%',
              height: 'auto'
          }} />
        <Text>
                We will email you once we are ready to roll out!
        </Text>
        <PanelFooter>
          <Space auto />
          <Button
            theme='success'
            children='You can close the browser now!' 
          />
        </PanelFooter>
      </Panel>
    </Overlay>
  );
}


export default SuccessModal;
