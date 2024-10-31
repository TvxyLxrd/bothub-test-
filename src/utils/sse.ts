import { Request, Response } from 'express';

export const streamResponse = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (data: string) => {
    res.write(`data: ${data}\n\n`);
  };

  // Пример стриминга данных
  const interval = setInterval(() => {
    sendEvent('New data chunk');
  }, 1000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
};