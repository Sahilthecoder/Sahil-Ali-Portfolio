import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Clock, Watch } from 'lucide-react';
import { useEffect, useState } from 'react';

// Simple cn utility for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface WorkingDay {
  day: string;
  hours: string;
  isWorkingDay: boolean;
}

const WorkingHours = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get user's timezone
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    return () => clearInterval(timer);
  }, []);

  // Check if current time is within working hours
  const isWorkingHours = (): boolean => {
    const day = currentTime.getDay(); // 0 (Sunday) to 6 (Saturday)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    // Monday to Friday (1-5), 9 AM to 6 PM
    if (day >= 1 && day <= 5) {
      const openTime = 9 * 60; // 9:00 AM in minutes
      const closeTime = 18 * 60; // 6:00 PM in minutes
      return currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
    }

    // Saturday 10 AM to 2 PM
    if (day === 6) {
      const openTime = 10 * 60; // 10:00 AM in minutes
      const closeTime = 14 * 60; // 2:00 PM in minutes
      return currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime;
    }

    return false; // Sunday or other cases
  };

  const workingDays: WorkingDay[] = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM', isWorkingDay: true },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM', isWorkingDay: true },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM', isWorkingDay: true },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM', isWorkingDay: true },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM', isWorkingDay: true },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM', isWorkingDay: true },
    { day: 'Sunday', hours: 'Closed', isWorkingDay: false },
  ];

  const currentDayIndex = (currentTime.getDay() + 6) % 7; // Adjust to make Monday index 0
  const isCurrentlyOpen = isWorkingHours();

  return (
    <motion.div
      className="bg-card rounded-xl border border-border/50 w-full overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary/10 text-primary mr-3">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Working Hours</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {isCurrentlyOpen ? "We're currently open!" : "We're currently closed"}
              </p>
            </div>
          </div>
          <div
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-medium flex items-center',
              isCurrentlyOpen
                ? 'bg-green-600/15 text-green-800 dark:text-green-100 dark:bg-green-500/20'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            )}
          >
            {isCurrentlyOpen ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                <span>Open Now</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 mr-1.5"></span>
                <span>Closed Now</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {workingDays.map((day, index) => {
            const isCurrentDay = index === currentDayIndex;
            return (
              <motion.div
                key={day.day}
                className={cn(
                  'flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors',
                  isCurrentDay
                    ? 'bg-accent/10 text-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-accent/5',
                  !day.isWorkingDay && 'opacity-80'
                )}
                whileHover={!isCurrentDay ? { x: 2 } : {}}
              >
                <div className="flex items-center">
                  <span
                    className={cn(
                      'w-1.5 h-1.5 rounded-full mr-2.5',
                      isCurrentDay
                        ? 'bg-primary'
                        : 'bg-muted-foreground/40',
                      !day.isWorkingDay && 'bg-muted-foreground/20'
                    )}
                  />
                  <span className={cn(
                    isCurrentDay ? 'font-medium' : '',
                    !day.isWorkingDay && 'text-gray-700 dark:text-gray-300 opacity-90'
                  )}>
                    {day.day}
                  </span>
                </div>
                <span className={cn(
                  isCurrentDay ? 'font-medium' : '',
                  !day.isWorkingDay ? 'text-foreground/80 dark:text-foreground/80' : 'text-foreground/90'
                )}>
                  {day.hours}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-foreground/80 dark:text-foreground/80">
              <Watch className="w-3.5 h-3.5 mr-2 text-foreground/60" />
              <span>{timezone}</span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs font-medium text-foreground/90 hover:text-foreground transition-colors flex items-center group"
              aria-expanded={isOpen}
              aria-controls="working-hours-details"
            >
              {isOpen ? 'Show less' : 'Show more'}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.span>
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="working-hours-details"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="text-sm text-foreground/90 dark:text-foreground/90 space-y-2">
                    <p>
                      We&apos;re available during our working hours for meetings, calls, and support.
                      Feel free to reach out during these times, and we&apos;ll get back to you as soon as possible.
                    </p>
                    <p className="text-xs text-foreground/80 dark:text-foreground/80">
                      <span className="font-medium">Note:</span> Response times may vary during holidays and weekends.
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-foreground/90 dark:text-foreground/90 pt-2 border-t border-border/20">
                    <span className="w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
                    Current time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


    </motion.div>
  );
};

export default WorkingHours;
