import { Router } from 'express'
import multer from 'multer'
import * as os from 'os'

import { createAGroup, sendMessageToGroup } from '../controllers/groupsControllers'
import isClientReady from '../middleware/clientMiddlewares'
import messageFormatVerify from '../middleware/messageMiddlewares'

const router = Router()

const upload = multer({
  storage: multer.diskStorage({ destination: os.tmpdir() }),
  limits: { fileSize: 2048 * 1024 * 1024 }
})

router.post(
  '/',
  isClientReady,
  createAGroup
)

router.post(
  '/sendMessage',
  isClientReady,
  upload.any(),
  messageFormatVerify,
  sendMessageToGroup
)

export default router
