import styled, { keyframes } from 'styled-components';
import { Link } from 'umi';
import { Wallet, getSelectedAccount, getSelectedAccountWallet } from "wan-dex-sdk-wallet";
import "wan-dex-sdk-wallet/index.css";
import { withRouter } from 'umi';
import { connect } from 'react-redux';



function BasicLayout(props) {
  return (
    <Ground>
      <TopBar>
        <Logo>
          <img src={require('../assets/new_logo.png')} width={160}/>
        </Logo>
        <Tab to="/" select={props.location.pathname === '/'}>SWAP</Tab>
        <Tab to="/pool" select={props.location.pathname === '/pool'}>POOL</Tab>
        <Tab to="/farm" select={props.location.pathname === '/farm'}>FARM</Tab>
        <Tab to="/vote" select={props.location.pathname === '/vote'}>VOTE</Tab>
      </TopBar>
      {props.children}
    </Ground>
  );
}

export default withRouter(connect(state => {
  const selectedAccountID = state.WalletReducer.get('selectedAccountID');
  return {
    selectedAccount: getSelectedAccount(state),
    selectedWallet: getSelectedAccountWallet(state),
    networkId: state.WalletReducer.getIn(['accounts', selectedAccountID, 'networkId']),
    selectedAccountID,
  }
})(BasicLayout));

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Ground = styled.div`
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(155, 200, 200, 1) 50%,
    rgba(255, 200, 200, 1) 100%
  );
  background-size: 400% 400%;
  background-position: 50%;
  /* animation: ${RainbowLight} 20s linear infinite; */
  height: 100%;
  width: 100%;
  /* padding-bottom: 40px; */
`;

const TopBar = styled.div`
  width: 100%;
  height: 60px;
  background-color: #00000020;
  margin: 0px;
  display:flex;
  justify-content: start;
`;

const Logo = styled.div`
  padding: 8px;
  margin-right: 40px;
`;

const Tab = styled(Link)`
  width: 80px;
  padding: 8px;
  margin: 6px;
  font-size: 22px;
  font-weight: ${props=>props.select?"bold":"normal"};
  color: ${props=>props.select?"#ffffffff":"#ffffffbb"};
`;
