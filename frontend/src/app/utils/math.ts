const MathUtil = {
  diffDays: (d1: string, d2: string) => {
    const date1: any = new Date(d1);
    const date2: any = new Date(d2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
export default MathUtil;
