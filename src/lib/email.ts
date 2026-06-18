import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.FROM_EMAIL || 'noreply@auraspa.in'
const SITE = process.env.NEXT_PUBLIC_APP_NAME || 'Aura Luxury Spa'

function baseTemplate(title: string, content: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
  body{margin:0;padding:0;background:#111827;font-family:Inter,sans-serif;color:#F8F6F0}
  .wrap{max-width:600px;margin:0 auto;padding:40px 20px}
  .header{text-align:center;padding:32px;background:linear-gradient(135deg,#1F2937,#111827);border-radius:16px 16px 0 0;border:1px solid rgba(212,175,55,0.2);border-bottom:none}
  .logo{font-family:Georgia,serif;font-size:28px;letter-spacing:8px;color:#D4AF37}
  .sub{font-size:11px;letter-spacing:4px;color:rgba(212,175,55,0.6);margin-top:4px}
  .body{background:#1F2937;padding:40px 32px;border:1px solid rgba(212,175,55,0.15);border-top:none;border-bottom:none}
  h1{font-family:Georgia,serif;font-size:26px;color:#F8F6F0;margin:0 0 16px}
  p{color:rgba(248,246,240,0.75);line-height:1.7;margin:0 0 16px;font-size:15px}
  .btn{display:inline-block;background:linear-gradient(135deg,#D4AF37,#E8D48B);color:#111827;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:1px;text-transform:uppercase;margin:8px 0}
  .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.3),transparent);margin:24px 0}
  .info-row{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(212,175,55,0.08)}
  .info-label{color:rgba(248,246,240,0.5);font-size:13px}
  .info-val{color:#F8F6F0;font-weight:600;font-size:13px}
  .footer{background:#0D0D0D;padding:24px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(212,175,55,0.1);border-top:none;text-align:center}
  .footer p{color:rgba(248,246,240,0.3);font-size:12px;margin:4px 0}
</style></head>
<body><div class="wrap">
  <div class="header">
    <div class="logo">AURA</div>
    <div class="sub">LUXURY SPA &amp; SALON</div>
  </div>
  <div class="body">${content}</div>
  <div class="footer">
    <p>© ${new Date().getFullYear()} ${SITE}. All rights reserved.</p>
    <p>12, Luxury Plaza, MG Road, Bangalore, Karnataka 560001</p>
    <p style="margin-top:8px"><a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#D4AF37;text-decoration:none">Visit Website</a> &nbsp;·&nbsp; <a href="tel:+919876543210" style="color:#D4AF37;text-decoration:none">+91 98765 43210</a></p>
  </div>
</div></body></html>`
}

export async function sendBookingConfirmation({
  to, name, service, therapist, date, time, amount, bookingId,
}: {
  to: string; name: string; service: string; therapist: string
  date: string; time: string; amount: number; bookingId: string
}) {
  const content = `
    <h1>Booking Confirmed! 🎉</h1>
    <p>Dear ${name},</p>
    <p>Your appointment has been confirmed. We look forward to welcoming you to <strong style="color:#D4AF37">Aura Luxury Spa</strong>.</p>
    <div class="divider"></div>
    <div class="info-row"><span class="info-label">Booking ID</span><span class="info-val" style="color:#D4AF37">#${bookingId}</span></div>
    <div class="info-row"><span class="info-label">Service</span><span class="info-val">${service}</span></div>
    <div class="info-row"><span class="info-label">Therapist</span><span class="info-val">${therapist}</span></div>
    <div class="info-row"><span class="info-label">Date</span><span class="info-val">${date}</span></div>
    <div class="info-row"><span class="info-label">Time</span><span class="info-val">${time}</span></div>
    <div class="info-row"><span class="info-label">Amount</span><span class="info-val" style="color:#D4AF37">₹${amount.toLocaleString('en-IN')}</span></div>
    <div class="divider"></div>
    <p style="font-size:13px;color:rgba(248,246,240,0.5)">Please arrive 10 minutes early. Free cancellation up to 24 hours before your appointment.</p>
    <div style="text-align:center;margin-top:24px">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/appointments" class="btn">View My Appointment</a>
    </div>`
  return resend.emails.send({
    from: `${SITE} <${FROM}>`,
    to,
    subject: `Booking Confirmed — ${service} at Aura Spa`,
    html: baseTemplate('Booking Confirmed', content),
  })
}

export async function sendAppointmentReminder({
  to, name, service, date, time,
}: {
  to: string; name: string; service: string; date: string; time: string
}) {
  const content = `
    <h1>Your Appointment is Tomorrow ✨</h1>
    <p>Dear ${name},</p>
    <p>Just a friendly reminder that your <strong style="color:#D4AF37">${service}</strong> appointment at Aura Luxury Spa is scheduled for <strong>${date}</strong> at <strong>${time}</strong>.</p>
    <div class="divider"></div>
    <p><strong>Before your visit:</strong></p>
    <ul style="color:rgba(248,246,240,0.75);line-height:2">
      <li>Arrive 10 minutes early to complete check-in</li>
      <li>Wear comfortable clothing</li>
      <li>Avoid heavy meals 1 hour before spa treatments</li>
      <li>Let us know of any allergies or medical conditions</li>
    </ul>
    <div style="text-align:center;margin-top:24px">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/appointments" class="btn">View Details</a>
    </div>`
  return resend.emails.send({
    from: `${SITE} <${FROM}>`,
    to,
    subject: `Reminder: Your ${service} appointment tomorrow`,
    html: baseTemplate('Appointment Reminder', content),
  })
}

export async function sendWelcomeEmail({ to, name }: { to: string; name: string }) {
  const content = `
    <h1>Welcome to Aura, ${name}! 🌟</h1>
    <p>We're thrilled to have you join the Aura family. Your journey to luxury wellness begins now.</p>
    <div class="divider"></div>
    <p><strong>Here's what you get as an Aura member:</strong></p>
    <ul style="color:rgba(248,246,240,0.75);line-height:2">
      <li>Easy online booking for 20+ premium services</li>
      <li>Earn reward points on every visit</li>
      <li>Exclusive member-only offers and early access</li>
      <li>Personalized treatment recommendations</li>
      <li>Birthday special treatment every year</li>
    </ul>
    <div style="text-align:center;margin-top:24px">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking" class="btn">Book Your First Treatment</a>
    </div>
    <div class="divider"></div>
    <p style="font-size:13px;color:rgba(248,246,240,0.5);text-align:center">Use code <strong style="color:#D4AF37">WELCOME15</strong> for 15% off your first booking!</p>`
  return resend.emails.send({
    from: `${SITE} <${FROM}>`,
    to,
    subject: `Welcome to ${SITE} — Your luxury wellness journey begins!`,
    html: baseTemplate('Welcome!', content),
  })
}

export async function sendCancellationEmail({
  to, name, service, date, time,
}: {
  to: string; name: string; service: string; date: string; time: string
}) {
  const content = `
    <h1>Appointment Cancelled</h1>
    <p>Dear ${name},</p>
    <p>Your <strong style="color:#D4AF37">${service}</strong> appointment on <strong>${date}</strong> at <strong>${time}</strong> has been cancelled.</p>
    <div class="divider"></div>
    <p>We hope to see you again soon. If you'd like to reschedule, you can book a new appointment any time.</p>
    <div style="text-align:center;margin-top:24px">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking" class="btn">Book Again</a>
    </div>`
  return resend.emails.send({
    from: `${SITE} <${FROM}>`,
    to,
    subject: `Appointment Cancelled — ${service}`,
    html: baseTemplate('Appointment Cancelled', content),
  })
}
