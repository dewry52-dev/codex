"""Original looping adventure music, synthesized locally without external assets."""
import math, random, wave
from array import array
from pathlib import Path

RATE=22050
BPM=132
BEAT=60/BPM
BARS=16
DURATION=BARS*4*BEAT
samples=array('f',[0])*round(DURATION*RATE)
rng=random.Random(1446)
def note(midi): return 440*2**((midi-69)/12)
def voice(start,duration,midi,gain,kind='pluck'):
    offset=round(start*RATE)
    count=round(duration*RATE)
    freq=note(midi)
    for i in range(count):
        j=offset+i
        if j>=len(samples): break
        t=i/RATE
        attack=min(1,t/.008)
        release=min(1,(duration-t)/.045)
        if kind=='pad':
            env=attack*release*.7
            value=math.sin(2*math.pi*freq*t)+.12*math.sin(2*math.pi*freq*2*t)
        elif kind=='bass':
            env=attack*release*math.exp(-t*6)
            value=math.sin(2*math.pi*freq*t)+.18*math.sin(2*math.pi*freq*2*t)
        else:
            env=attack*release*math.exp(-t*8)
            value=math.sin(2*math.pi*freq*t)+.32*math.sin(2*math.pi*freq*2*t)+.12*math.sin(2*math.pi*freq*3*t)
        samples[j]+=gain*env*value
def drum(start,kind):
    duration={'kick':.18,'snare':.13,'hat':.045}[kind]
    offset=round(start*RATE)
    for i in range(round(duration*RATE)):
        j=offset+i
        if j>=len(samples):break
        t=i/RATE
        if kind=='kick': value=.14*math.sin(2*math.pi*(64*t+4*(1-math.exp(-t*35))))*math.exp(-t*22)
        elif kind=='snare': value=.045*rng.uniform(-1,1)*math.exp(-t*35)+.025*math.sin(2*math.pi*185*t)*math.exp(-t*28)
        else: value=.018*rng.uniform(-1,1)*math.exp(-t*90)
        samples[j]+=value
# Newly written melodic phrases over C / G / Am / F. No borrowed composition.
phrases=[[76,79,81,79,76,74,72,74],[74,79,83,81,79,76,74,71],
         [72,76,81,83,84,83,81,76],[77,81,79,77,76,74,72,79],
         [79,84,83,79,81,79,76,74],[83,81,79,74,76,79,74,71],
         [81,84,83,81,76,79,81,76],[77,79,81,79,76,74,72,76]]
chords=[(48,60,64,67),(43,59,62,67),(45,60,64,69),(41,60,65,69)]
for bar in range(BARS):
    start=bar*4*BEAT
    chord=chords[bar%4]
    phrase=phrases[(bar%4)+(4 if (bar//4)%2 else 0)]
    for i,m in enumerate(phrase):voice(start+i*BEAT/2,BEAT*.43,m,.14)
    for beat in range(4):
        voice(start+beat*BEAT,BEAT*.72,chord[0]+(12 if beat==2 else 0),.14,'bass')
        drum(start+beat*BEAT,'kick' if beat%2==0 else 'snare')
        voice(start+beat*BEAT+BEAT/2,BEAT*.37,chord[1+beat%3]+12,.052)
        for half in range(2):drum(start+(beat+half*.5)*BEAT,'hat')
    for m in chord[1:]:voice(start,BEAT*3.8,m,.017,'pad')
peak=max(abs(x) for x in samples)
pcm=array('h',(round(max(-1,min(1,x/peak*.78))*32767) for x in samples))
target=Path(__file__).parent/'dist/assets/danbi-adventure.wav'
with wave.open(str(target),'wb') as f:
    f.setnchannels(1);f.setsampwidth(2);f.setframerate(RATE);f.writeframes(pcm.tobytes())
print(f'Original music: {DURATION:.2f}s, {BPM} BPM, {target.stat().st_size} bytes')
