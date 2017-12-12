import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Timeline } from 'react-twitter-widgets'
//https://github.com/andrewsuzuki/react-twitter-widgets/blob/HEAD/site/screenshot.png
//https://www.npmjs.com/package/react-twitter-widgets
import FacebookProvider, { Page } from 'react-facebook';
//https://www.npmjs.com/package/react-facebook

import styles from './Container.css';
export class SocialContainer extends Component{	
	render(){
		return (
			<div className={styles.socialContainer}>
				<div className={styles.twitter}>
					<Timeline
						dataSource={{
							sourceType: 'profile',
							screenName: 'DublinBusNews'
						}}
						
						options={{
							username: 'DublinBusNews',
							height: '800',
							width: '500'
					}	}
						
						onLoad={() => console.log('Timeline is loaded!')}
					/>
				</div>
				
				<div className={styles.facebook}>
				      <FacebookProvider appId="1911226898917332">
							<Page href="https://www.facebook.com/DublinBusNews/" tabs="timeline" width="500px" height="800px" />
					</FacebookProvider>  
				</div>
			</div>
		);	
	}
}
export default SocialContainer;
