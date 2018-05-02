import React from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'

import styles from './$COMPONENT$.modules.scss'

/**
 * @version ./package.json
 */
const $COMPONENT$ = ({ ...rest }) => <div className={styles.container} {...safeRest(rest)} />

$COMPONENT$.propTypes = {}

$COMPONENT$.defaultProps = {}

export default $COMPONENT$
