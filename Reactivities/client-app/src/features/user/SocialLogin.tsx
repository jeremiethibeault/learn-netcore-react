import React from 'react'
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button, Icon } from 'semantic-ui-react';

interface IProps {
    facebookCallback: (response: any) => void;
}

const SocialLogin: React.FC<IProps> = ({facebookCallback}) => {
    return (
        <div>
            <FacebookLogin
                appId="611062069612737"
                fields="name,email,picture"
                callback={facebookCallback}
                render={(renderProps: any) => (
                    <Button onClick={renderProps.onClick} type="button" fluid color="facebook">
                        <Icon name="facebook" />
                        Login with Facebook
                    </Button>
                )}
            />
        </div>
    )
}

export default SocialLogin
